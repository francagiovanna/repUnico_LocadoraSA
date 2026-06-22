import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from '../services/customers.service.js'

export const listarClientes = async (req, res) => {
  try {
    const customers = await getAllCustomers()
    res.status(200).json(customers)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

export const buscarCliente = async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id)

    if (!customer) {
      return res.status(404).json({
        erro: 'Cliente não encontrado'
      })
    }

    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({
      erro: error.message
    })
  }
}

export const criarCliente = async (req, res) => {
  try {
    const customer = await createCustomer(req.body)

    res.status(201).json(customer)
  } catch (error) {
    res.status(400).json({
      erro: error.message
    })
  }
}

export const editarCliente = async (req, res) => {
  try {
    const customer = await updateCustomer(
      req.params.id,
      req.body
    )

    if (!customer) {
      return res.status(404).json({
        erro: 'Cliente não encontrado'
      })
    }

    res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({
      erro: error.message
    })
  }
}

export const removerCliente = async (req, res) => {
  try {
    const customer = await deleteCustomer(req.params.id)

    if (!customer) {
      return res.status(404).json({
        erro: 'Cliente não encontrado'
      })
    }

    res.status(200).json({
      mensagem: 'Cliente removido com sucesso',
      customer
    })
  } catch (error) {
    res.status(500).json({
      erro: error.message
    })
  }
}