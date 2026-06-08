import { Router } from 'express'
import { criarLivro, listarLivros } from '../controllers/livroController.js'

const router = Router()

router.post('/cadastrar-livro', criarLivro)
router.get('/livros', listarLivros)

export default router