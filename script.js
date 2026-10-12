'use strict';

console.log('script.js підключено');
console.log('Пашко Ростислав | ІП-53 | Практикум №7 | Варіант 2');

const currentYear = 2026;
const selectedCategory = 'Вебдизайн';

// Навчальні дані для перевірки різних категорій і граничних років.
const works = [
    { title: 'Навчальний лендинг', year: 2021, category: 'Вебдизайн',
      image: 'assets/img/project1.svg', alt: 'Ескіз навчального лендингу' },
    { title: 'Навчальна айдентика', year: 2022, category: 'Графічний дизайн',
      image: 'assets/img/project2.svg', alt: 'Ескіз навчальної айдентики' },
    { title: 'Макет каталогу', year: 2023, category: 'Вебдизайн',
      image: 'assets/img/project2.svg', alt: 'Ескіз каталогу' },
    { title: 'Афіша події', year: 2024, category: 'Графічний дизайн',
      image: 'assets/img/project3.svg', alt: 'Ескіз афіші події' },
    { title: 'Дизайн галереї', year: 2025, category: 'Вебдизайн',
      image: 'assets/img/project1.svg', alt: 'Ескіз дизайну галереї' },
    { title: 'Макет портфоліо', year: 2026, category: 'Вебдизайн',
      image: 'assets/img/project3.svg', alt: 'Ескіз портфоліо' }
];

const listContainer = document.querySelector('#gallery');
const projectsCount = document.querySelector('#projects-count');

// Видаляє першу статичну картку з HTML; решту прибере функція рендеру.
const placeholder = document.querySelector('#gallery article');
if (placeholder) placeholder.remove();

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

// Створює картки з масиву, позначає нещодавні роботи та оновлює лічильник.
function renderProjects(projects) {
    listContainer.querySelectorAll('article').forEach(card => card.remove());

    for (const project of projects) {
        const card = document.createElement('article');
        card.classList.add('project-card');
        card.dataset.category = project.category;
        card.dataset.year = String(project.year);

        const title = document.createElement('h3');
        title.textContent = project.title;
        const image = document.createElement('img');
        image.src = project.image;
        image.alt = project.alt;
        const year = document.createElement('p');
        year.textContent = `Рік: ${project.year}`;
        const category = document.createElement('p');
        category.textContent = project.category;
        card.append(title, image, year, category);

        if (isRecent(project.year)) {
            card.classList.add('recent');
            const badge = document.createElement('span');
            badge.classList.add('project-badge');
            badge.textContent = 'Нещодавня робота';
            card.append(badge);
        }

        listContainer.append(card);
    }

    projectsCount.textContent = `Кількість робіт: ${projects.length}`;
}

renderProjects(works);
console.log(`DOM: ${listContainer.querySelectorAll('article').length} карток; recent: ${listContainer.querySelectorAll('.recent').length}`);
