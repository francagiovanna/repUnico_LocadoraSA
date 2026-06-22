INSERT INTO games (title, genre, platform, daily_price, stock) VALUES
('The Last of Us', 'Aventura', 'PS5', 15.00, 3),
('FIFA 25', 'Esporte', 'PS5', 12.00, 5),
('Zelda: Tears of the Kingdom', 'RPG', 'Switch', 14.00, 2);

INSERT INTO customers (name, email, phone) VALUES
('Ana Lima', 'ana@email.com', '47999990001'),
('Pedro Costa', 'pedro@email.com', '47999990002');

INSERT INTO rentals (game_id, customer_id, rented_at, due_date, total_price) VALUES
(1, 1, '2025-04-10', '2025-04-13', 45.00),
(2, 2, '2025-04-11', '2025-04-14', 36.00);