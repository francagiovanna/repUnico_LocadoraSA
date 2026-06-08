
# ENTREGA 8 — Descritivo de Casos de Teste de Software

## 8.1 Casos de Teste

A tabela abaixo relaciona os casos de teste aos requisitos funcionais do sistema.

| ID Caso de Teste | ID Requisito Funcional | Descrição | Precondição | Passos | Resultado Esperado |
|------------------|------------------------|-----------|-------------|--------|--------------------|
| CT-01 | RF-01 | Cadastrar usuário com dados válidos | Banco de dados disponível | 1. Enviar POST /users com nome e e-mail válidos<br>2. Verificar resposta da API | Retorna status 201 e os dados do usuário criado |
| CT-02 | RF-01 | Tentar cadastrar usuário com e-mail já existente | Usuário com mesmo e-mail já cadastrado | 1. Enviar POST /users com e-mail duplicado<br>2. Verificar resposta da API | Retorna status 400 com mensagem de erro |
| CT-03 | RF-Login | Validar login com dados válidos | Usuário cadastrado no sistema | 1. Acessar tela de login<br>2. Informar e‑mail e senha válidos<br>3. Clicar em entrar | Usuário acessa o dashboard |

---

## 8.2 Ferramentas e Ambientes de Teste

### Ferramentas de Teste
- Jest — execução dos testes unitários (back-end e front-end)
- Supertest — simulação de requisições HTTP no back-end
- Navegador
- Postman
- Console do navegador

### Ambiente de Teste

- **Ambiente:** Desenvolvimento local 
- **Servidor de Teste:** Node.js 
- **Banco de Dados / Versão:** Por enquanto MySQL 
- **Browser / Versão:** Google Chrome (última versão) 
- **Sistema Operacional:** Windows 11 