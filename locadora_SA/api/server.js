import express from 'express'
import { pool } from './config/db.js'

const app = express()
const PORT = 3000
app.use(express.json())


pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})


const client = await pool.connect() // utilizamos quando vamos fazer transactions 


app.get("/", (req, res) => {
    res.json("Hola Mundo!")
})

app.get("/alunos", async (req, res) => {
    try {
        const restorno = await client.query("SELECT * from alunos")
        res.status(200).json(restorno.rows)
    } catch (error) {
        throw new Error(error);
    }
})

app.use('/alunos')

app.listen(PORT, () => {
    console.log(`Aplicação rodando em: http://localhost:${PORT}`)
})