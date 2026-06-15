import { pool } from '../config/db.js'

export const getAllRentals = async () => {
  const result = await pool.query(`
    SELECT
      r.id,
      c.name        AS customer,
      g.title       AS game,
      g.platform,
      r.rented_at,
      r.due_date,
      r.returned_at,
      r.total_price
    FROM rentals r
    JOIN customers c ON r.customer_id = c.id
    JOIN games     g ON r.game_id     = g.id
    ORDER BY r.id ASC
  `)
  return result.rows
}

export const createRental = async ({ game_id, customer_id, due_date }) => {
  if (!game_id || !customer_id || !due_date) {
    throw new Error('Campos obrigatórios: game_id, customer_id, due_date')
  }

  // Verifica estoque
  const gameResult = await pool.query('SELECT * FROM games WHERE id = $1', [game_id])
  const game = gameResult.rows[0]
  if (!game) throw new Error('Jogo não encontrado')
  if (game.stock <= 0) throw new Error('Jogo sem estoque disponível')

  // Calcula total_price (daily_price × dias)
  const today = new Date().toISOString().split('T')[0]
  const dias = Math.ceil((new Date(due_date) - new Date(today)) / (1000 * 60 * 60 * 24))
  if (dias <= 0) throw new Error('Data de devolução deve ser futura')
  const total_price = (game.daily_price * dias).toFixed(2)

  const result = await pool.query(
    `INSERT INTO rentals (game_id, customer_id, rented_at, due_date, total_price)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [game_id, customer_id, today, due_date, total_price]
  )

  // Decrementa estoque
  await pool.query('UPDATE games SET stock = stock - 1 WHERE id = $1', [game_id])

  return result.rows[0]
}

export const returnRental = async (id) => {
  const rentalResult = await pool.query('SELECT * FROM rentals WHERE id = $1', [id])
  const rental = rentalResult.rows[0]

  if (!rental) throw new Error('Aluguel não encontrado')
  if (rental.returned_at) throw new Error('Esse aluguel já foi devolvido')

  const today = new Date().toISOString().split('T')[0]

  const result = await pool.query(
    'UPDATE rentals SET returned_at = $1 WHERE id = $2 RETURNING *',
    [today, id]
  )

  // Devolve ao estoque
  await pool.query('UPDATE games SET stock = stock + 1 WHERE id = $1', [rental.game_id])

  return result.rows[0]
}