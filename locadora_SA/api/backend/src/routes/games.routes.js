import { Router } from 'express'
import { getAllGames, getGameById, createGame, updateGame, deleteGame } from '../services/jogos.service.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const games = await getAllGames()
    res.status(200).json(games)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const game = await getGameById(req.params.id)
    if (!game) return res.status(404).json({ erro: 'Jogo não encontrado' })
    res.status(200).json(game)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const game = await createGame(req.body)
    res.status(201).json(game)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const game = await updateGame(req.params.id, req.body)
    if (!game) return res.status(404).json({ erro: 'Jogo não encontrado' })
    res.status(200).json(game)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const game = await deleteGame(req.params.id)
    if (!game) return res.status(404).json({ erro: 'Jogo não encontrado' })
    res.status(200).json({ mensagem: 'Jogo removido com sucesso', game })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

export default router