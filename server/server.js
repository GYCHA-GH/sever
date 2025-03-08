const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASSWORD || "2468680",
  port: process.env.DB_PORT || 5432,
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ error: "Все поля обязательны" });
    }

    const checkUser = await pool.query('SELECT * FROM "Sever".users WHERE phone = $1', [phone]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: "Пользователь с таким номером уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      'INSERT INTO "Sever".users (name, phone, password) VALUES ($1, $2, $3) RETURNING id, name, phone',
      [name, phone, hashedPassword]
    );

    const user = newUser.rows[0];
    const token = jwt.sign({ id: user.id }, "secret-key", { expiresIn: "1h" });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Ошибка при регистрации:", err);
    res.status(500).json({ error: "Ошибка на сервере" });
  }
});

// Маршрут для получения конкретного продукта по ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM "Sever".products WHERE id = $1', [id]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Продукт не найден" });
    }
  } catch (error) {
    console.error("Ошибка на сервере:", error);
    res.status(500).json({ error: error.message });
  }
});

// Маршрут для получения всех статей
app.get('/articles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Sever".articleinfo');
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении статей:", error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

// Маршрут для получения вакансий
app.get('/jobs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Sever".jobsdata');
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении вакансий:", error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

// Раздача статических файлов (из папок uploads и articleImg)
app.use('/uploads', express.static('uploads'));
app.use('/articleImg', express.static('articleImg'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

