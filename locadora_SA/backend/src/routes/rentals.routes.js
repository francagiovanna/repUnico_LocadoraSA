import { Router } from 'express'

import {
  listarAlugueis,
  criarAluguel,
  devolverAluguel
} from '../controllers/rentals.controller.js'

const router = Router()

router.get('/', listarAlugueis)

router.post('/', criarAluguel)

router.patch('/:id/return', devolverAluguel)

export default router