CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL
);

INSERT INTO users (name, role) VALUES 
('Иван Иванов', 'DevOps Engineer'),
('Алексей Петров', 'Backend Developer'),
('Мария Сидорова', 'Frontend Developer')
ON CONFLICT DO NOTHING;