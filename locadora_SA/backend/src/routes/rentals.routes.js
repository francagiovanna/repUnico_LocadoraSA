import { Router } from 'express'
import { getAllRentals, createRental, returnRental } from '../services/alugueis.service.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const rentals = await getAllRentals()
    res.status(200).json(rentals)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const rental = await createRental(req.body)
    res.status(201).json(rental)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

// PATCH /rentals/:id/return — registra devolução
router.patch('/:id/return', async (req, res) => {
  try {
    const rental = await returnRental(req.params.id)
    res.status(200).json(rental)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

export default router