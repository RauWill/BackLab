const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const childRoutes = require('./routes/child.routes');
const lessonRoutes = require('./routes/lesson.routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/children', childRoutes);

app.use('/api/lessons', lessonRoutes);

app.use((err, req, res, next) => {
  console.error('Необработанная ошибка:', err.stack);
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

module.exports = app;
