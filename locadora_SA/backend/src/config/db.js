import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
})

pool.query('SELECT 1')
  .then(() => console.log('✅ Banco de dados conectado'))
  .catch((err) => console.error('❌ Erro ao conectar ao banco:', err))