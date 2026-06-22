import { Router } from 'express'

import {
  listarClientes,
  buscarCliente,
  criarCliente,
  editarCliente,
  removerCliente
} from '../controller/customers.controller.js'

const router = Router()

router.get('/', listarClientes)
router.get('/:id', buscarCliente)
router.post('/', criarCliente)
router.put('/:id', editarCliente)
router.delete('/:id', removerCliente)

export default router