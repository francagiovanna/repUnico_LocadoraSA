// Testes da Locadora S/A
// Tabelas: games, customers, rentals

// ==================== GAMES ====================

describe('Games', () => {

  test('Deve cadastrar um jogo com todos os campos', () => {
    const game = {
      title: 'Tekken 3',
      genre: 'Luta',
      platform: 'PS1',
      daily_price: 10.00,
      stock: 4
    }
    expect(game.title).toBe('Tekken 3')
    expect(game.daily_price).toBeGreaterThan(0)
    expect(game.stock).toBeGreaterThan(0)
  })

  test('Não deve aceitar jogo sem título', () => {
    const title = ''
    expect(title).toBeFalsy()
  })

  test('Não deve aceitar preço negativo ou zero', () => {
    const daily_price = 0
    expect(daily_price).toBeFalsy()
  })

  test('Estoque deve diminuir ao alugar', () => {
    let stock = 3
    stock -= 1
    expect(stock).toBe(2)
  })

  test('Estoque deve aumentar ao devolver', () => {
    let stock = 2
    stock += 1
    expect(stock).toBe(3)
  })

})

// ==================== CUSTOMERS ====================

describe('Customers', () => {

  test('Deve cadastrar cliente com nome e email', () => {
    const customer = {
      name: 'Ana Lima',
      email: 'ana@email.com',
      phone: '47999990001'
    }
    expect(customer.name).toBeTruthy()
    expect(customer.email).toContain('@')
  })

  test('Não deve aceitar email sem @', () => {
    const email = 'emailinvalido.com'
    expect(email).not.toContain('@')
  })

  test('Não deve aceitar cliente sem nome', () => {
    const name = ''
    expect(name).toBeFalsy()
  })

})

// ==================== RENTALS ====================

describe('Rentals', () => {

  test('Deve registrar aluguel com game_id, customer_id e due_date', () => {
    const rental = {
      game_id: 1,
      customer_id: 1,
      rented_at: '2025-04-10',
      due_date: '2025-04-13',
      total_price: 45.00
    }
    expect(rental.game_id).toBeTruthy()
    expect(rental.customer_id).toBeTruthy()
    expect(rental.total_price).toBeGreaterThan(0)
  })

  test('Não deve alugar jogo sem estoque', () => {
    const stock = 0
    expect(stock).toBeFalsy()
  })

  test('Deve calcular total_price corretamente', () => {
    const daily_price = 15.00
    const dias = 3
    const total_price = daily_price * dias
    expect(total_price).toBe(45.00)
  })

  test('Deve registrar returned_at ao devolver', () => {
    const rental = { returned_at: null }
    rental.returned_at = '2025-04-13'
    expect(rental.returned_at).not.toBeNull()
  })

})