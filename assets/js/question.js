const queryString = window.location.search;
console.log(queryString);

const q_type = document.querySelector('.question_type');
const q_count = document.querySelector('.count');
const curr_q = document.querySelector('#curr_q');
const q = document.querySelector('.question');
const next_btn = document.querySelector('.next');

let answers_arr = new Array;
const answers = document.querySelector('.answers');

let result = 0;
let q_index = 0;

let timeleft = 59;
let tmr = document.getElementById('tmr');
let timer_bar = document.getElementById('t_bar');

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

function appendAnswers() {
    
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
        animationRefresh(answer_text);
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

    curr_q.innerHTML = q_index + 1;
    q_count.appendChild(curr_q);
    animationRefresh(curr_q);
    q_count.innerHTML = curr_q.innerHTML + "/" + questions.length;
    

    q.innerHTML = questions[q_index].question;
    animationRefresh(q);

    getAnswers(questions[q_index].incorrect_answers,questions[q_index].correct_answer);
    appendAnswers();
    addingEventListenerToAnswers();

    next_btn.disabled = true;

    let difficulty = localStorage.getItem('difficulty');

    if (difficulty === 'easy') {
        timeleft = 59;
    }
    else if (difficulty === 'medium') {
        timeleft = 40;
        document.getElementById('t_bar').classList.add('seconds-40');    
    }
    else if (difficulty === 'hard') {
        timeleft = 20;
        document.getElementById('t_bar').classList.add('seconds-20');
    }
}

function checkAnswer(question) {
    let answered_index = 0;
    for (let index = 0; index < answers_arr.length; index++) {
        if(document.getElementById('radio_a' + index).checked) {
            answered_index = index;
        }
    }
    
    if(document.getElementById('ans' + answered_index).innerHTML == question.correct_answer) {
        result++;
    }
    console.log(document.getElementById('ans' + answered_index).innerHTML);
    console.log(result);
    localStorage.setItem('result', result);
    animationRefresh(timer_bar);
 }

function animationRefresh(element) {
    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation =  null;
 }


function timerCheck(questions) {
    var answer_timer = setInterval(function () {
        if (q_index + 1 == questions.length) 
        next_btn.innerHTML = "Finish";
        
        if(q_index == questions.length) {
            console.log(result);
            
            window.location = "./result.html?amount=" + 'result=' + result + '&total_questions=' + questions.length;
            return;
        }
        
        tmr.innerHTML = timeleft + 's';
        timeleft--;
        if(timeleft <= -1) {
            q_index++;
            checkAnswer(questions[q_index]);
            initAnswers(questions);
            clearInterval(answer_timer);
        }
    }, 700);
}

function useAPIdata(questions) {
    
    startQuiz(questions);
    initAnswers(questions);
    timerCheck(questions);
    
    next_btn.addEventListener('click', () => {
       checkAnswer(questions[q_index]);
        q_index++;
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

