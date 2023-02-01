const express = require('express');
const path = require('path');

// Создаем приложение express
const app = express();

// Задаем URL-путь '/static' для статических данных из папки frontend/static
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')));

// Для любого URL-пути сервер будет выдавать файл index.html из папки frontend
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

// Запускаем сервер
app.listen(process.env.PORT || 8080, () => console.log('Server running...'));