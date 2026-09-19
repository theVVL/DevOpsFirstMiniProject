const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors()); // Разрешаем фронтенду делать запросы к API с другого порта
app.use(express.json());

// Переменные подключения берутся из окружения (задаются в docker-compose)
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// Эндпоинт для проверки связи и получения данных из БД
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, role FROM users;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection failed:', details: err.message });
  }
});

// НОВЫЙ ЭНДПОИНТ ДЛЯ СОХРАНЕНИЯ В БАЗУ ДАННЫХ
app.post('/api/users', async (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role are required' });
  }

  try {
    // Вставляем данные в таблицу users и возвращаем добавленную строку
    const result = await pool.query(
      'INSERT INTO users (name, role) VALUES ($1, $2) RETURNING *;',
      [name, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to insert user into database', details: err.message });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
