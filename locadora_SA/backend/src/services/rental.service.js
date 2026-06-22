import { pool } from '../config/db.js'

export const getAllRentals = async () => {
  const result = await pool.query(`
    SELECT
      r.id,
      c.name AS customer,
      g.title AS game,
      g.platform,
      r.rented_at,
      r.due_date,
      r.returned_at,
      r.total_price
    FROM rentals r
    JOIN customers c ON c.id = r.customer_id
    JOIN games g ON g.id = r.game_id
    ORDER BY r.id ASC
  `)

  return result.rows
}

export const createRental = async ({
  game_id,
  customer_id,
  due_date
}) => {
  if (!game_id || !customer_id || !due_date) {
    throw new Error(
      'Campos obrigatórios: game_id, customer_id e due_date'
    )
  }

  const gameResult = await pool.query(
    'SELECT * FROM games WHERE id = $1',
    [game_id]
  )

  const game = gameResult.rows[0]

  if (!game) {
    throw new Error('Jogo não encontrado')
  }

  if (Number(game.stock) <= 0) {
    throw new Error('Jogo sem estoque disponível')
  }

  const today = new Date()
  const returnDate = new Date(due_date)

  const dias = Math.ceil(
    (returnDate - today) / (1000 * 60 * 60 * 24)
  )

  if (dias <= 0) {
    throw new Error(
      'Data de devolução deve ser maior que a data atual'
    )
  }

  const total_price = Number(game.daily_price) * dias

  const result = await pool.query(
    `
      INSERT INTO rentals (
        game_id,
        customer_id,
        rented_at,
        due_date,
        total_price
      )
      VALUES ($1, $2, CURRENT_DATE, $3, $4)
      RETURNING *
    `,
    [
      game_id,
      customer_id,
      due_date,
      total_price
    ]
  )

  await pool.query(
    'UPDATE games SET stock = stock - 1 WHERE id = $1',
    [game_id]
  )

  return result.rows[0]
}

export const returnRental = async (id) => {
  const rentalResult = await pool.query(
    'SELECT * FROM rentals WHERE id = $1',
    [id]
  )

  const rental = rentalResult.rows[0]

  if (!rental) {
    throw new Error('Aluguel não encontrado')
  }

  if (rental.returned_at) {
    throw new Error('Esse aluguel já foi devolvido')
  }

  const result = await pool.query(
    `
      UPDATE rentals
      SET returned_at = CURRENT_DATE
      WHERE id = $1
      RETURNING *
    `,
    [id]
  )

  await pool.query(
    'UPDATE games SET stock = stock + 1 WHERE id = $1',
    [rental.game_id]
  )

  return result.rows[0]
}