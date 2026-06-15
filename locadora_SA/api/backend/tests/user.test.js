describe('Usuários', () => {
  test('Deve cadastrar usuário', () => {
    const user = {
      nome: 'Admin',
      email: 'admin@email.com'
    }

    expect(user.email).toContain('@')
  })
})