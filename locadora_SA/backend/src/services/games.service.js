import { pool } from '../config/db.js'

export const getAllGames = async () => {
  const result = await pool.query('SELECT * FROM games ORDER BY id ASC')
  return result.rows
}

export const getGameById = async (id) => {
  const result = await pool.query('SELECT * FROM games WHERE id = $1', [id])
  return result.rows[0]
}

export const createGame = async ({ title, genre, platform, daily_price, stock }) => {
 if (
  !title || !title.trim() ||
  !genre || !genre.trim() ||
  !platform || !platform.trim() ||
  daily_price === undefined || daily_price === null
) {
  throw new Error("Campos obrigatórios: title, genre, platform, daily_price");
}

  const result = await pool.query(
    'INSERT INTO games (title, genre, platform, daily_price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, genre, platform, daily_price, stock ?? 1]
  );

  return result.rows[0];
};

export const updateGame = async (id, { title, genre, platform, daily_price, stock }) => {
  const result = await pool.query(
    `UPDATE games SET
      title       = COALESCE($1, title),
      genre       = COALESCE($2, genre),
      platform    = COALESCE($3, platform),
      daily_price = COALESCE($4, daily_price),
      stock       = COALESCE($5, stock)
     WHERE id = $6
     RETURNING *`,
    [title, genre, platform, daily_price, stock, id]
  )
  return result.rows[0]
}

export const deleteGame = async (id) => {
  const result = await pool.query('DELETE FROM games WHERE id = $1 RETURNING *', [id])
  return result.rows[0]
}