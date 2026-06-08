import { Router } from 'express'
import { criarUsuario, listarUsuarios } from '../controllers/usuarioController.js'

const router = Router()

router.post('/user', criarUsuario)
router.get('/users', listarUsuarios)
router.delete('/users/:id', deletaUsuario)


export default router

