/* This extracts the query string */
const queryString = window.location.search;

const start_btn = document.querySelector('.quiz_btn');
let topic = document.querySelector('#topic_input');
let difficullty = document.querySelector('#diff_input');
let number_of_questions = document.querySelector('#num_of_questions');

console.log(queryString);

// Categories

    fetch('https://opentdb.com/api_category.php')
        .then(res => {
            return res.json();
        })
        .then(data => {
            categories = data.trivia_categories;

            let select = document.getElementById('topic_input');

            for(let i = 0; i < categories.length; i++) {
                let category = document.createElement('option');
                category.text = categories[i].name;
                category.value = categories[i].name;
                select.appendChild(category);
            }
        })
  
// Questions

start_btn.addEventListener('click', () => {
    let topic_id = 0;
    for(let i = 0; i < categories.length; i++) {
        if(topic.value == categories[i].name) {
            topic_id = categories[i].id;
            break;
        }
    }
    window.location = "./question.html?amount=" + number_of_questions.value + "&category=" + topic_id + "&difficulty=" + difficullty.value;     
});

let index = 0;
let randomID = 0;
let numOfQuestions = 0;

fetch('https://opentdb.com/api_category.php')
        .then(res => {
            return res.json();
        })
        .then(data => {
            categories = data.trivia_categories;
            index = Math.floor(Math.random() * categories.length);
            randomID = categories[index].id;
            numOfQuestions = Math.floor(Math.random() * 9) + 1;

            const random_btn = document.querySelector('.random_btn');
            const random_nav_btn = document.querySelector('.random_nav_btn');

            random_btn.addEventListener('click', () => {
                window.location = " ./question.html?amount=" + numOfQuestions + "&category=" + randomID + "&difficulty=easy";
            })
            random_nav_btn.addEventListener('click', () => {
                window.location = " ./question.html?amount=" + numOfQuestions + "&category=" + randomID + "&difficulty=easy";
            })
        })
