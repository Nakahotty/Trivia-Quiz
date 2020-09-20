const queryString = window.location.search;
console.log(queryString);

const q_type = document.querySelector('.question_type');
const q_count = document.querySelector('.count');
const q = document.querySelector('.question');
const next_btn = document.querySelector('.next');

let answers_arr = new Array;
const answers = document.querySelector('.answers');

let result = 0;
let q_index = 0;

let api_req = "https://opentdb.com/api.php" + queryString;
fetch(api_req)
    .then(res => {
        return res.json();
    })
    .then(data => {
        let questions = data.results;
        console.log(data);
        useAPIdata(questions);
    })

function shuffleAnswers() {
    for (let i = answers_arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers_arr[i], answers_arr[j]] = [answers_arr[j], answers_arr[i]];
    }
}

function getAnswers(incorrect_answers, correct_answer) {
    answers_arr = incorrect_answers;
    answers_arr.push(correct_answer);
    shuffleAnswers();
}

function appendAnswers(answer_choice) {

    for (let index = 0; index < answers_arr.length; index++) {

        let answer = document.createElement('li');
        answer.classList.add('answer');
        let answer_text = document.createElement('p');

        answer_text.classList.add('answer_text');
        answer_text.id = 'ans' + index;
        answer_text.innerHTML = answers_arr[index];
        answer_text.value = answers_arr[index];

        let answer_btn = document.createElement('input');
        answer_btn.classList.add('marker');
        answer_btn.type = 'radio';
        answer_btn.name = 'q_marker'
        answer_btn.id = 'radio_a' + index;
        answer.appendChild(answer_btn);
        answer.appendChild(answer_text);
        answers.appendChild(answer);
    }
}

function addingEventListenerToAnswers() {
    document.querySelectorAll('.answer').forEach(item => {
        item.addEventListener('click', () => {
          item.firstChild.checked = true;
          next_btn.disabled = false;
        })
    })
}

function startQuiz(questions) {
    q_type.innerHTML = questions[q_index].category + ", " + questions[q_index].difficulty;
    q_count.innerHTML = (q_index + 1) + "/" + questions.length;
    q.innerHTML = questions[q_index].question; 

    // Result
    localStorage.setItem('category', questions[q_index].category);
    localStorage.setItem('difficulty', questions[q_index].difficulty)
    localStorage.setItem('numOfQuestions', questions.length);
}

function initAnswers(questions) {

    while(answers.firstChild){
        answers.removeChild(answers.firstChild);
    }

    q_count.innerHTML = (q_index + 1) + "/" + questions.length;
    q.innerHTML = questions[q_index].question;
    getAnswers(questions[q_index].incorrect_answers,questions[q_index].correct_answer);
    appendAnswers();
    addingEventListenerToAnswers();
    next_btn.disabled = true;
    
}

function checkAnswer(question) {
    let answered_index = 0;
    for (let index = 0; index < answers_arr.length; index++) {
        if(document.getElementById('radio_a' + index).checked) {
            answered_index = index;
        }
    }
    
    console.log(question.correct_answer);
    

    if(document.getElementById('ans' + answered_index).innerHTML == question.correct_answer){
        result++;
    }
    console.log(document.getElementById('ans' + answered_index).innerHTML);
    console.log(result);
    q_index++;
}


function useAPIdata(questions) {
    
    startQuiz(questions);
    initAnswers(questions);

    next_btn.addEventListener('click', () => {
        checkAnswer(questions[q_index]);
        if (q_index + 1 == questions.length) 
            next_btn.innerHTML = "Finish";

        if(q_index == questions.length) {
            console.log(result);
            window.location = "./result.html?amount=" + 'result=' + result + '&total_questions=' + questions.length;
            return;
        }
        
        initAnswers(questions);
       
        
    })
}

