const start_quiz = document.querySelector('#start_quiz');

start_quiz.addEventListener('click', () => {
    window.location = " ./quiz_form.html";
});

let index = 0;
let randomID = 0;
let numOfQuestions = 0;
let difficullty = 'easy';

fetch('https://opentdb.com/api_category.php')
        .then(res => {
            return res.json();
        })
        .then(data => {
            categories = data.trivia_categories;
            console.log(categories);
            console.log(categories.length);
            index = Math.floor(Math.random() * categories.length);
            randomID = categories[index].id;
            numOfQuestions = Math.floor(Math.random() * 9) + 1;

            const random_btn = document.querySelector('.random_btn');
            random_btn.addEventListener('click', () => {
                window.location = " ./random.html?amount=" + numOfQuestions + "&category=" + randomID + "&difficulty=" + difficullty;
            })
        })
