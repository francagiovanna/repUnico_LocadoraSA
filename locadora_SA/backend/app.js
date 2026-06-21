import express from 'express'
import cors from 'cors'
import gamesRoutes from './routes/jogos.routes.js'
import customersRoutes from './routes/usuarios.routes.js'
import rentalsRoutes from './routes/alugueis.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/games', gamesRoutes)
app.use('/customers', customersRoutes)
app.use('/rentals', rentalsRoutes)

app.get('/', (req, res) => {
  res.json({ mensagem: '🎮 API Locadora S/A rodando!' })
})

export default app