import gamesRoutes from './routes/games.routes.js'
import customersRoutes from './routes/customers.routes.js'
import rentalsRoutes from './routes/rentals.routes.js'

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