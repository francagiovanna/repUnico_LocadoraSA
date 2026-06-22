# 8. Descritivo de Casos de Teste de Software

---

## 8.1 Casos de Teste

| ID do Caso de Teste | ID do Requisito Funcional | Descrição do Caso de Teste | Pré-condições | Passos para Execução | Resultado Esperado |
|---------------------|----------------------------|-----------------------------|----------------|-----------------------|--------------------|
| CT01 | RF01 | Cadastrar jogo com todos os campos válidos | Sistema inicializado | Informar título, gênero, plataforma, preço e estoque | Jogo cadastrado com sucesso |
| CT02 | RF02 | Validar cadastro de jogo sem título | Sistema inicializado | Tentar cadastrar jogo sem título | Sistema deve rejeitar o cadastro |
| CT03 | RF03 | Validar preço inválido | Sistema inicializado | Informar preço zero ou negativo | Sistema deve impedir cadastro |
| CT04 | RF04 | Reduzir estoque ao realizar aluguel | Jogo com estoque disponível | Realizar operação de aluguel | Estoque deve diminuir |
| CT05 | RF05 | Aumentar estoque ao devolver jogo | Jogo alugado | Realizar devolução | Estoque deve aumentar |
| CT06 | RF06 | Cadastrar cliente com dados válidos | Sistema inicializado | Informar nome e e-mail válido | Cliente cadastrado com sucesso |
| CT07 | RF07 | Validar e-mail sem “@” | Sistema inicializado | Informar e-mail inválido | Sistema deve rejeitar cadastro |
| CT08 | RF08 | Validar cliente sem nome | Sistema inicializado | Tentar cadastrar cliente sem nome | Sistema deve rejeitar cadastro |
| CT09 | RF09 | Registrar aluguel válido | Cliente e jogo existentes | Criar registro de aluguel | Aluguel registrado corretamente |
| CT10 | RF10 | Bloquear aluguel sem estoque | Jogo sem estoque | Tentar realizar aluguel | Sistema deve bloquear operação |
| CT11 | RF11 | Calcular valor total do aluguel | Aluguel criado | Executar cálculo de valor | Valor deve ser calculado corretamente |
| CT12 | RF12 | Registrar devolução com data | Aluguel ativo | Realizar devolução | Campo returned_at deve ser preenchido |

---

## 8.2 Ferramentas e Ambientes de Teste

- **Ferramenta de testes:** Jest  
- **Ambiente de execução:** Node.js  
- **Sistema operacional:** Windows  
- **Banco de dados:** PostgreSQL (Neon Serverless)  
- **Backend:** Express.js  
- **Frontend:** React com Vite  
- **Tipo de teste:** Testes unitários  

---

## 8.3 Requisitos Funcionais

| ID | Requisito | Descrição |
|----|----------|------------|
| RF01 | Cadastro de jogos | Permite cadastrar jogos com título, preço, gênero e estoque |
| RF02 | Validação de título | Não permite cadastro sem título |
| RF03 | Validação de preço | Não permite preço zero ou negativo |
| RF04 | Controle de estoque (aluguel) | Reduz estoque ao alugar jogo |
| RF05 | Controle de estoque (devolução) | Aumenta estoque ao devolver jogo |
| RF06 | Cadastro de clientes | Permite cadastro com nome e e-mail |
| RF07 | Validação de e-mail | E-mail deve conter formato válido |
| RF08 | Validação de cliente | Nome é obrigatório |
| RF09 | Registro de aluguel | Permite registrar locação com cliente e jogo |
| RF10 | Controle de estoque no aluguel | Impede aluguel sem estoque |
| RF11 | Cálculo de valor de aluguel | Calcula valor total da locação |
| RF12 | Registro de devolução | Registra data de devolução |

---

## 8.4 Execução dos Testes Unitários

### Objetivo
Validar as regras de negócio do sistema Locadora S/A por meio de testes unitários automatizados utilizando Jest.

### Escopo
Foram testadas as funcionalidades relacionadas a jogos, clientes e locações, incluindo validações de dados, controle de estoque e cálculos de valores.

### Tipo de teste aplicado
Testes unitários.

### Ambiente de teste
Ambiente local de desenvolvimento utilizando Node.js.

### Ferramenta utilizada
Jest.

---

## 8.5 Relatório de Execução e Validação dos Testes

### Execução dos testes
Os testes unitários foram executados utilizando Jest no ambiente Node.js. O objetivo foi validar a lógica de negócio do backend do sistema, garantindo o correto funcionamento das regras de cadastro, validação, locação e devolução.

Durante a execução, foram validadas as seguintes regras:
- Cadastro e validação de jogos  
- Cadastro e validação de clientes  
- Controle de estoque em operações de aluguel e devolução  
- Cálculo do valor total da locação  
- Registro de data de devolução  

### Resultado da execução
A execução dos testes resultou em sucesso total, com todos os casos de teste aprovados.

Foram executados **12 testes unitários**, todos concluídos sem falhas.

### Evidências de execução
- Evidência 1: Print do terminal com execução do comando `npm test`, exibindo resultado “12 tests passed”  
- Evidência 2: Print do arquivo de testes `locadora.spec.js`  
- Evidência 3: Print da configuração do Jest no arquivo `package.json`  

### Análise dos resultados
Os resultados demonstram que as regras de negócio do sistema estão corretamente implementadas e validadas. O sistema apresenta comportamento consistente nas operações de cadastro, validação de dados, controle de estoque e registro de locações.

Não foram identificadas falhas durante a execução dos testes.

### Classificação de falhas
Não foram detectadas falhas nos testes unitários executados.

### Conclusão da validação
Os testes unitários demonstram que o backend do sistema atende aos requisitos funcionais definidos, garantindo confiabilidade nas regras de negócio implementadas.