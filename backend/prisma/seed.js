// prisma/seed.js
// Заполняем базу данных начальными данными для разработки и тестирования.
// Запуск: npm run db:seed

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...');

  // Создаём тестового родителя
  const hashedPassword = await bcrypt.hash('password123', 10);
  const parent = await prisma.user.upsert({
    where: { email: 'parent@test.com' },
    update: {},
    create: {
      email: 'parent@test.com',
      password: hashedPassword,
      role: 'PARENT',
    },
  });
  console.log('✅ Создан пользователь:', parent.email);

  // Создаём профиль ребёнка
  const child = await prisma.childProfile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Алиса',
      age: 5,
      avatar: '🐱',
      parentId: parent.id,
    },
  });
  console.log('✅ Создан профиль ребёнка:', child.name);

  // Создаём учебный блок "Буквы"
  const unit = await prisma.unit.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Буквы',
      description: 'Изучаем русский алфавит',
      order: 1,
    },
  });

  // Создаём уроки
  const lesson1 = await prisma.lesson.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Буква А',
      order: 1,
      xpReward: 10,
      unitId: unit.id,
      exercises: {
        create: [
          {
            type: 'MULTIPLE_CHOICE',
            question: 'Какая это буква?',
            options: JSON.stringify(['А', 'Б', 'В', 'Г']),
            correctAnswer: 'А',
            order: 1,
          },
          {
            type: 'MULTIPLE_CHOICE',
            question: 'Что начинается на букву А?',
            options: JSON.stringify(['Апельсин', 'Банан', 'Вишня', 'Груша']),
            correctAnswer: 'Апельсин',
            order: 2,
          },
        ],
      },
    },
  });

  const lesson2 = await prisma.lesson.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Буква Б',
      order: 2,
      xpReward: 10,
      unitId: unit.id,
      exercises: {
        create: [
          {
            type: 'MULTIPLE_CHOICE',
            question: 'Какая это буква?',
            options: JSON.stringify(['А', 'Б', 'В', 'Г']),
            correctAnswer: 'Б',
            order: 1,
          },
        ],
      },
    },
  });

  console.log('✅ Созданы уроки:', lesson1.title, lesson2.title);
  console.log('🎉 База данных успешно заполнена!');
  console.log('\nДанные для входа:');
  console.log('Email: parent@test.com');
  console.log('Пароль: password123');
}

main()
  .catch((e) => {
    console.error('Ошибка при заполнении БД:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
