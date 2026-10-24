let studentName = prompt("Введите ваше имя:", "Татьяна");
if (!studentName || studentName.trim() === "") {
    studentName = "Студент";
}

//исходные данные
let labScores = [92, 45, 88, 76, 95, 82];


//функция поиска максимального балла
function findMax(scores) {
    let max = scores[0];
    for (let i = 1; i < scores.length; i++) {
        if (scores[i] > max) {
            max = scores[i];
        }
    }
    return max;
}

//функция фильтрации
function filterHighScores(scores) {
    let highScores = [];
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] >= 80) {
            highScores.push(scores[i]);
        }
    }
    return highScores;
}

//функция подсчета суммы баллов
function calculateSum(scores) {
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    return sum;
}

//функция подсчета количества неудовлетворительных работ 
function countFailed(scores) {
    let failedCount = 0;
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] < 50) {
            failedCount++;
        }
    }
    return failedCount;
}


let maxScore = findMax(labScores);
let excellentWorks = filterHighScores(labScores);
let countExcellent = excellentWorks.length;
let totalSum = calculateSum(labScores);
let averageScore = totalSum / labScores.length;
let failedCount = countFailed(labScores); // Вызываем инкапсулированную функцию


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
