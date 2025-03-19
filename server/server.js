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
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "2468680",
  port: 5432,
});


// Регистрация пользователя
app.post("/register", async (req, res) => {
  const { name, phone, password } = req.body;

  // Проверка входных данных
  if (!name || !phone || !password) {
    return res.status(400).json({ error: "Заполните все поля" });
  }

  try {
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Добавляем пользователя в базу
    const newUser = await pool.query(
      `INSERT INTO "Sever".users (name, phone, password, created_at) 
       VALUES ($1, $2, $3, NOW()) RETURNING id, name, phone`,
      [name, phone, hashedPassword]
  );
  

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error("Ошибка регистрации:", err);
    res.status(500).json({ error: "Ошибка регистрации" });
  }
});

// Авторизация пользователя
app.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
      const user = await pool.query('SELECT * FROM "Sever".users WHERE phone = $1', [phone]);

      if (user.rows.length === 0) {
          return res.status(401).json({ error: "Неверный телефон или пароль" });
      }

      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) {
          return res.status(401).json({ error: "Неверный телефон или пароль" });
      }

      const token = jwt.sign({ id: user.rows[0].id, name: user.rows[0].name }, "your_secret_key", { expiresIn: "1h" });

      res.json({ token, user: { id: user.rows[0].id, name: user.rows[0].name } });
  } catch (err) {
      res.status(500).json({ error: "Ошибка входа" });
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

app.get("/cart", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Sever".basket');
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении корзины:", error);
    res.status(500).json({ error: "Ошибка при получении данных" });
  }
});

app.get('/reviews', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Sever".reviews');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Маршрут для получения данных из таблицы maslo
app.get('/maslo', async (req, res) => {
  try {
    // Пример запроса к PostgreSQL
    const result = await pool.query('SELECT * FROM "Sever".maslo');
    // Если возвращаете только первую запись
    // res.json(result.rows[0]);

    // Или если хотите вернуть весь массив
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});



// Раздача статических файлов (из папок uploads и articleImg)
app.use('/uploads', express.static('uploads'));
app.use('/articleImg', express.static('articleImg'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер попущен`);
});

