import { Router } from 'express'
import { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from '../services/usuarios.service.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const customers = await getAllCustomers()
    res.status(200).json(customers)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id)
    if (!customer) return res.status(404).json({ erro: 'Cliente não encontrado' })
    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const customer = await createCustomer(req.body)
    res.status(201).json(customer)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const customer = await updateCustomer(req.params.id, req.body)
    if (!customer) return res.status(404).json({ erro: 'Cliente não encontrado' })
    res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const customer = await deleteCustomer(req.params.id)
    if (!customer) return res.status(404).json({ erro: 'Cliente não encontrado' })
    res.status(200).json({ mensagem: 'Cliente removido com sucesso', customer })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

export default router