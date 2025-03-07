const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

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

// ✅ Добавляем маршрут для получения вакансий
app.get('/jobs', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM "Sever".jobsdata');
      res.json(result.rows);
  } catch (error) {
      console.error("Ошибка при получении вакансий:", error);
      res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

// Раздача статических файлов
app.use('/uploads', express.static('uploads'));
app.use('/articleImg', express.static('articleImg'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
