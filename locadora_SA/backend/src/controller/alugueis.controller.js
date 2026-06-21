import {
  getAllRentals,
  createRental,
  returnRental
} from '../services/alugueis.service.js'

export const listarAlugueis = async (req, res) => {
  try {
    const rentals = await getAllRentals()

    res.status(200).json(rentals)
  } catch (error) {
    res.status(500).json({
      erro: error.message
    })
  }
}

export const criarAluguel = async (req, res) => {
  try {
    const rental = await createRental(req.body)

    res.status(201).json(rental)
  } catch (error) {
    res.status(400).json({
      erro: error.message
    })
  }
}

export const devolverAluguel = async (req, res) => {
  try {
    const rental = await returnRental(req.params.id)

    res.status(200).json(rental)
  } catch (error) {
    res.status(400).json({
      erro: error.message
    })
  }
}