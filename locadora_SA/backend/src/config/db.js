import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'game_rental',
})

pool.query('SELECT 1')
  .then(() => console.log('✅ Banco de dados conectado'))
  .catch((err) => console.error('❌ Erro ao conectar ao banco:', err))