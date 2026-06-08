CREATE DATABASE IF NOT EXISTS game_rental;
USE game_rental;

CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    platform VARCHAR(100) NOT NULL,
    daily_price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    customer_id INT NOT NULL,
    rented_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    due_date DATE NOT NULL,
    returned_at DATE,
    total_price DECIMAL(10, 2),
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

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