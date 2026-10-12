'use strict';

console.log('Пашко Ростислав | ІП-53 | Практикум №7 | Варіант 3');

// Навчальні записи: усі п’ять рівнів настрою та різні нотатки.
const moodEntries = [
    { date: '2026-10-01', mood: 2, note: 'Складний день: багато навчальних завдань.' },
    { date: '2026-10-02', mood: 4, note: 'Вдалося завершити заплановану роботу.' },
    { date: '2026-10-03', mood: 3, note: 'Звичайний день без помітних змін.' },
    { date: '2026-10-04', mood: 5, note: 'Приємна зустріч і час для відпочинку.' },
    { date: '2026-10-05', mood: 1, note: 'Було важко зосередитися на навчанні.' },
    { date: '2026-10-06', mood: 4, note: 'Прогулянка та виконані завдання.' }
];
const listContainer = document.querySelector('#mood-history');
const averageElement = document.querySelector('#avg-mood');
const entriesCount = document.querySelector('#entries-count');
const periodStatus = document.querySelector('#period-status');

// Статичний article залишається орієнтиром у HTML і видаляється програмно.
const placeholder = document.querySelector('#mood-history article');
if (placeholder) placeholder.remove();

// Стрілкова функція повертає текстову назву рівня настрою.
const moodToLabel = mood => ({
    1: 'Дуже складний', 2: 'Складний', 3: 'Нейтральний',
    4: 'Гарний', 5: 'Чудовий'
})[mood] ?? 'Невідомо';
const moodClasses = {
    'Дуже складний': 'hard', 'Складний': 'hard',
    'Нейтральний': 'neutral', 'Гарний': 'good', 'Чудовий': 'good'
};

// Підраховує середній настрій циклом for...of; порожній список має null.
function getAverageMood(entries) {
    if (entries.length === 0) return null;
    let sum = 0;
    for (const entry of entries) sum += entry.mood;
    return sum / entries.length;
}

// Створює article з датою, оцінкою, нотаткою, data-mood і класом за moodToLabel.
function renderMoodHistory(entries) {
    listContainer.querySelectorAll('article').forEach(card => card.remove());
    for (const entry of entries) {
        const card = document.createElement('article');
        const label = moodToLabel(entry.mood);
        card.classList.add('mood-card', moodClasses[label] ?? 'neutral');
        card.dataset.mood = String(entry.mood);
        const date = document.createElement('h3');
        date.textContent = entry.date;
        const rating = document.createElement('p');
        rating.classList.add('mood-rating');
        rating.textContent = `Рівень: ${entry.mood} з 5 — ${label}`;
        const note = document.createElement('p');
        note.classList.add('mood-note');
        note.textContent = entry.note || 'Без нотатки.';
        card.append(date, rating, note);
        listContainer.append(card);
    }
    const average = getAverageMood(entries);
    averageElement.textContent = average === null ? 'Ще немає записів'
        : `Середній настрій: ${average.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} із 5`;
    entriesCount.textContent = `Записів: ${entries.length}`;
    if (average === null) periodStatus.textContent = '';
    else if (average >= 3) periodStatus.textContent = 'Гарний тиждень';
    else periodStatus.textContent = 'Важкий тиждень';
}
renderMoodHistory(moodEntries);
console.log(`DOM: ${listContainer.querySelectorAll('article').length} записів`);
console.log(`Середнє: ${getAverageMood(moodEntries).toFixed(2)}`);
for (const entry of moodEntries) {
    console.log(`${entry.date} | ${entry.mood} | ${moodToLabel(entry.mood)}`);
}
