CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL
);

INSERT INTO users (name, role) VALUES 
('Иван Иванов', 'DevOps Engineer'),
('Алексей Петров', 'Backend Developer'),
('Мария Сидорова', 'Frontend Developer'),
('Мария Сидорова1', 'Frontend Developer'),
('Мария Сидорова2', 'Frontend Developer'),
('Мария Сидорова3', 'Frontend Developer'),
('Мария Сидорова4', 'Frontend Developer'),
('Мария Сидорова5', 'Frontend Developer'),
('Мария Сидорова6', 'Frontend Developer'),
('Мария Сидорова7', 'Frontend Developer'),
('Мария Сидорова8', 'Frontend Developer'),
('Мария Сидорова9', 'Frontend Developer'),
('Мария Сидорова10', 'Frontend Developer')
ON CONFLICT DO NOTHING;