describe('Aluguéis', () => {
  test('Deve registrar aluguel', () => {
    const aluguel = {
      jogo: 'Mario Kart 64',
      usuario: 'João'
    }

    expect(aluguel.jogo).toBe('Mario Kart 64')
  })
})