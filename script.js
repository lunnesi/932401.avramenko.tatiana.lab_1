let studentName = prompt("Введите ваше имя:", "Татьяна");
if (!studentName || studentName.trim() === "") {
    studentName = "Студент";
}

//Исходные данные
let labScores = [92, 45, 88, 76, 95, 82];


//Функция поиска максимального балла
function findMax(scores) {
    let max = scores[0];
    for (let i = 1; i < scores.length; i++) {
        if (scores[i] > max) {
            max = scores[i];
        }
    }
    return max;
}

//оставить только баллы >= 80 — «отлично»
function filterHighScores(scores) {
    let highScores = [];
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] >= 80) {
            highScores.push(scores[i]);
        }
    }
    return highScores;
}

//Функция подсчета суммы баллов
function calculateSum(scores) {
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    return sum;
}

//Цикл для подсчета количества работ с баллом < 50 («неудовлетворительно»)
let failedCount = 0;
for (let i = 0; i < labScores.length; i++) {
    if (labScores[i] < 50) {
        failedCount++;
    }
}


let maxScore = findMax(labScores);
let excellentWorks = filterHighScores(labScores);
let countExcellent = excellentWorks.length;
let totalSum = calculateSum(labScores);
let averageScore = totalSum / labScores.length;


alert(`Привет, ${studentName}! У вас ${countExcellent} отличных работ, максимальный балл – ${maxScore}.`);


console.log("=== Статистика успеваемости студента ===");
console.log("Баллы за лабораторные:", labScores);
console.log("Средний балл:", averageScore.toFixed(2));
console.log("Количество неудовлетворительных работ (<50):", failedCount);

if (averageScore >= 85) {
    console.log("Мотивация: Отличный результат! Ваш средний балл выше 85. Вы уверенно движетесь к успешной стажировке!");
} else {
    console.log("Мотивация: Хороший старт! Немного упорства — и результаты станут еще лучше.");
}
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".projects-flex");
    const addBtn = document.getElementById("add-project-btn");
    const deleteBtn = document.getElementById("delete-project-btn");
    const toggleVisBtn = document.getElementById("toggle-visibility-btn");
    const themeBtn = document.getElementById("toggle-theme-btn");
    const bodyElement = document.body;

    if (!container || !addBtn || !deleteBtn || !toggleVisBtn || !themeBtn) {
        console.error("Ошибка: Ключевые элементы DOM для управления проектами не найдены.");
        return; // Прекращаем выполнение скрипта при отсутствии элементов
    }

    //восстановление состояния из localStorage при загрузке страницы

    const savedTheme = localStorage.getItem("siteTheme") || "theme-light";
    bodyElement.className = savedTheme;

    const savedProjects = localStorage.getItem("projectsList");
    if (savedProjects) {
        container.innerHTML = savedProjects;
    }

    function saveProjectsState() {
        localStorage.setItem("projectsList", container.innerHTML);
    }

    //кнопка «Добавить проект» (createElement, prompt, appendChild)
    addBtn.addEventListener("click", () => {
        let title = prompt("Введите название проекта:", "Новый проект");
        if (!title || title.trim() === "") return;

        let tech = prompt("Введите стек технологий (например: C++, Python, SQL):", "C++, Web");
        if (!tech) tech = "Custom / Web";

        let desc = prompt("Введите краткое описание проекта:", "Технологии и функционал...");
        if (!desc) desc = "Описание отсутствует";

        const article = document.createElement("article");
        article.className = "project-card";

        article.innerHTML = `
            <div class="project-icon">🚀</div>
            <div class="project-content">
                <h4>${escapeHTML(title)}</h4>
                <p class="tech-stack"><strong>Стек:</strong> ${escapeHTML(tech)}</p>
                <p class="project-desc">${escapeHTML(desc)}</p>
                <a href="#" class="btn-more">Подробнее</a>
            </div>
        `;

        container.appendChild(article);
        saveProjectsState();
    });

    //кнопка «Удалить последний» (querySelectorAll, remove)
    deleteBtn.addEventListener("click", () => {
        const cards = container.querySelectorAll(".project-card");
        if (cards.length > 0) {
            cards[cards.length - 1].remove();
            saveProjectsState(); // Сохраняем в localStorage
        } else {
            console.log("Нет проектов для удаления");
            alert("Список пуст");
        }
    });

    //кнопка «Свернуть проекты» (скрытие/показ блока через класс hidden)
    toggleVisBtn.addEventListener("click", () => {
        container.classList.toggle("hidden");
        if (container.classList.contains("hidden")) {
            toggleVisBtn.textContent = "Развернуть проекты";
        } else {
            toggleVisBtn.textContent = "Свернуть проекты";
        }
    });

    //кнопка переключения темы (светлая / тёмная + localStorage)
    themeBtn.addEventListener("click", () => {
        if (bodyElement.classList.contains("theme-light")) {
            bodyElement.classList.replace("theme-light", "theme-dark");
            localStorage.setItem("siteTheme", "theme-dark");
        } else {
            bodyElement.classList.replace("theme-dark", "theme-light");
            localStorage.setItem("siteTheme", "theme-light");
        }
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});
