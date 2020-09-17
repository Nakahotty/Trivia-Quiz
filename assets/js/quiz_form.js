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

/* this uses them to make an API call 
fetch('https://opentdb.com/api.php'+queryString,)
    .then(res => {
        return res.json();
    })
    .then(data => console.log(data)) */