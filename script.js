'use strict';

console.log('script.js підключено');
console.log('Пашко Ростислав | ІП-53 | Практикум №6 | Варіант 2');

const currentYear = 2026;
const selectedCategory = 'Вебдизайн';

// Навчальні дані для перевірки різних категорій і граничних років.
const works = [
    { title: 'Навчальний лендинг', year: 2021, category: 'Вебдизайн' },
    { title: 'Навчальна айдентика', year: 2022, category: 'Графічний дизайн' },
    { title: 'Макет каталогу', year: 2023, category: 'Вебдизайн' },
    { title: 'Афіша події', year: 2024, category: 'Графічний дизайн' },
    { title: 'Дизайн галереї', year: 2025, category: 'Вебдизайн' },
    { title: 'Макет портфоліо', year: 2026, category: 'Вебдизайн' }
];

// Повертає true, якщо за умовою варіанта роботі не більше двох років.
const isRecent = year => (2026 - year) <= 2;

// Виводить роботи обраної категорії та повертає кількість знайдених робіт.
function listWorksByCategory(items, category) {
    let count = 0;

    console.log(`Роботи категорії «${category}»:`);
    for (const work of items) {
        if (work.category === category) {
            console.log(`${work.title} | ${work.year} | ${work.category}`);
            count += 1;
        }
    }

    console.log(`Знайдено робіт: ${count}`);
    return count;
}

// Позначає роботи старші трьох років і повертає їхню кількість.
function classifyWorksByAge(items, referenceYear) {
    let olderCount = 0;

    console.log('Класифікація за віком:');
    for (const work of items) {
        const age = referenceYear - work.year;
        if (age > 3) {
            console.log(`${work.title} (${work.year}): старша 3 років`);
            olderCount += 1;
        } else {
            console.log(`${work.title} (${work.year}): не старша 3 років`);
        }
    }

    console.log(`Робіт старших 3 років: ${olderCount}`);
    return olderCount;
}

console.log(`Кількість робіт у масиві: ${works.length}`);
console.log(`Тип title: ${typeof works[0].title}`);
console.log(`Тип year: ${typeof works[0].year}`);
console.log(`Тип результату isRecent: ${typeof isRecent(works[0].year)}`);

listWorksByCategory(works, selectedCategory);
classifyWorksByAge(works, currentYear);

console.log('Перевірка стрілкової функції isRecent:');
for (const work of works) {
    console.log(`${work.title} (${work.year}): isRecent = ${isRecent(work.year)}`);
}
