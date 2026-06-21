import { Router } from 'express'

import {
  listarJogos,
  buscarJogo,
  criarJogo,
  editarJogo,
  removerJogo
} from '../controllers/games.controller.js'

const router = Router()

router.get('/', listarJogos)

router.get('/:id', buscarJogo)

router.post('/', criarJogo)

router.put('/:id', editarJogo)

router.delete('/:id', removerJogo)

export default router