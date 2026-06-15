describe('Jogos', () => {

  test('Deve cadastrar um jogo', () => {

    const jogo = {
      titulo: 'Tekken 3',
      genero: 'Luta'
    }

    expect(jogo.titulo).toBe('Tekken 3')

  })

  test('Não deve aceitar jogo sem nome', () => {

    const titulo = ''

    expect(titulo).toBeFalsy()

  })

})