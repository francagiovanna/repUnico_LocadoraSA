import { pool } from '../config/db.js'

export const getAllCustomers = async () => {
  const result = await pool.query('SELECT * FROM customers ORDER BY id ASC')
  return result.rows
}

export const getCustomerById = async (id) => {
  const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id])
  return result.rows[0]
}

export const createCustomer = async ({ name, email, phone }) => {
  if (!name || !email) {
    throw new Error('Nome e email são obrigatórios')
  }
  if (!email.includes('@')) {
    throw new Error('Email inválido')
  }

  const existing = await pool.query('SELECT id FROM customers WHERE email = $1', [email])
  if (existing.rows.length > 0) {
    throw new Error('Já existe um cliente com esse email')
  }

  const result = await pool.query(
    'INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
    [name, email, phone ?? null]
  )
  return result.rows[0]
}

export const updateCustomer = async (id, { name, email, phone }) => {
  const result = await pool.query(
    `UPDATE customers SET
      name  = COALESCE($1, name),
      email = COALESCE($2, email),
      phone = COALESCE($3, phone)
     WHERE id = $4
     RETURNING *`,
    [name, email, phone, id]
  )
  return result.rows[0]
}

export const deleteCustomer = async (id) => {
  const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id])
  return result.rows[0]
}