import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import gamesRoutes from './routes/jogos.routes.js'
import customersRoutes from './routes/usuarios.routes.js'
import rentalsRoutes from './routes/alugueis.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/games', gamesRoutes)
app.use('/customers', customersRoutes)
app.use('/rentals', rentalsRoutes)

app.get('/', (req, res) => {
  res.json({ mensagem: '🎮 API Locadora S/A rodando!' })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})

export default app