'use strict';

console.log('script.js підключено');
console.log('Пашко Ростислав | ІП-53 | Практикум №8 | Варіант 2');

const currentYear = new Date().getFullYear();
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
const categoryFilter = document.querySelector('#category-filter');
const filterCount = document.querySelector('#filter-count');
const form = document.querySelector('#project-form');
const titleInput = document.querySelector('#project-title');
const yearInput = document.querySelector('#project-year');
const categoryInput = document.querySelector('#project-category');
const yearError = document.querySelector('#year-error');
const formStatus = document.querySelector('#form-status');
yearInput.max = String(currentYear);

// Видаляє першу статичну картку з HTML; решту прибере функція рендеру.
const placeholder = document.querySelector('#gallery article');
if (placeholder) placeholder.remove();

// Повертає true, якщо за умовою варіанта роботі не більше двох років.
const isRecent = year => (currentYear - year) <= 2;

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
    applyCategoryFilter();
}

renderProjects(works);
console.log(`DOM: ${listContainer.querySelectorAll('article').length} карток; recent: ${listContainer.querySelectorAll('.recent').length}`);

// Приховує картки інших категорій; усі записи залишаються в масиві та DOM.
function applyCategoryFilter() {
    const category = categoryFilter.value;
    let visibleCount = 0;
    for (const card of listContainer.querySelectorAll('article')) {
        const hidden = category !== 'all' && card.dataset.category !== category;
        card.classList.toggle('hidden', hidden);
        if (!hidden) visibleCount += 1;
    }
    filterCount.textContent = `Показано робіт: ${visibleCount}`;
}

// Подія change перемикає фільтр без повторного створення карток.
categoryFilter.addEventListener('change', applyCategoryFilter);

// Подія input відразу перевіряє, чи рік не перевищує поточний.
function validateYear() {
    const future = yearInput.value !== '' && Number(yearInput.value) > currentYear;
    const message = future ? `Рік не може бути в майбутньому. Максимум — ${currentYear}.` : '';
    yearInput.setCustomValidity(message);
    yearError.textContent = message;
    yearInput.setAttribute('aria-invalid', String(!yearInput.validity.valid));
}
yearInput.addEventListener('input', validateYear);

// Подія input відхиляє назву, яка складається лише з пробілів.
titleInput.addEventListener('input', () => {
    titleInput.setCustomValidity(titleInput.value !== '' && titleInput.value.trim() === ''
        ? 'Введіть назву роботи, а не лише пробіли.' : '');
});

// Подія submit додає коректний запис і оновлює галерею без перезавантаження.
form.addEventListener('submit', event => {
    event.preventDefault();
    validateYear();
    if (!form.reportValidity()) return;
    const title = titleInput.value.trim();
    const year = Number(yearInput.value);
    const category = categoryInput.value;
    const project = {
        title, year, category,
        image: category === 'Вебдизайн' ? 'assets/img/project1.svg' : 'assets/img/project2.svg',
        alt: `Навчальний ескіз роботи «${title}»`
    };
    works.push(project);
    renderProjects(works);
    form.reset();
    yearInput.setCustomValidity('');
    yearInput.removeAttribute('aria-invalid');
    yearError.textContent = '';
    const hidden = categoryFilter.value !== 'all' && categoryFilter.value !== category;
    formStatus.textContent = `Додано роботу «${title}».${hidden ? ' Щоб її побачити, виберіть її категорію або «Усі роботи».' : ''}`;
    console.log(`Додано: ${title} | ${year} | ${category}; усього робіт: ${works.length}`);
});
