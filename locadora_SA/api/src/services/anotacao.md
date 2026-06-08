# Services

A camada de **services** é responsável pela lógica de negócio da aplicação.
Ela fica entre o controller e o banco de dados, garantindo que os dados
passem por validações e regras antes de qualquer operação.

## Por que usar?

Separar a lógica do controller deixa o código mais organizado e fácil de
manter. O controller só recebe a requisição e devolve a resposta — quem
decide se os dados são válidos é o service.

## Fluxo

requisição → controller → service → banco de dados → controller → resposta

## Exemplo prático

Antes de cadastrar um usuário, o `usuarioServices.js` verifica se nome e
e-mail foram informados e se o e-mail tem formato válido. Se algo estiver
errado, ele lança um erro e o controller devolve status 400 sem nem
chegar no banco.
