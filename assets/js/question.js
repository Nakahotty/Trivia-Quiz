const queryString = window.location.search;
console.log(queryString);

const q_type = document.querySelector('.question_type');
const q_count = document.querySelector('.count');
const q = document.querySelector('.question');
const next_btn = document.querySelector('.next');

const answers = document.querySelector('.answers');
let result = 0;

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

function getAnswer(answer_choice) {

    let answer = document.createElement('li');
    answer.classList.add('answer');
    answer.id = 'a1';
    let answer_text = document.createElement('label');
    answer_text.classList.add('answer_text');
    answer_text.innerHTML = answer_choice;
    answer_text.value = answer_choice;

    let answer_btn = document.createElement('input');
    answer_btn.classList.add('marker');
    answer_btn.type = 'radio';
    answer_btn.name = 'q_marker'
    answer.appendChild(answer_btn);
    answer.appendChild(answer_text);
    answers.appendChild(answer);

}
    
function getAnswers (incorrect_answers, correct_answer) {
    
    getAnswer(correct_answer);

    for (let index = 0; index <  incorrect_answers.length; index++) {
        getAnswer(incorrect_answers[index]);
    }
}

let q_index = 0;

function useAPIdata(questions) {
    
    q_type.innerHTML = questions[q_index].category + ", " + questions[q_index].difficulty;
    q_count.innerHTML = (q_index + 1) + "/" + questions.length;
    q.innerHTML = questions[q_index].question; 
    getAnswers(questions[q_index].incorrect_answers,questions[q_index].correct_answer);
    q_index++;

    next_btn.addEventListener('click', () => {

        if(q_index == questions.length) {
            window.location = "./result.html";
        }
        while(answers.firstChild){
            answers.removeChild(answers.firstChild);
        }

        q_count.innerHTML = (q_index + 1) + "/" + questions.length;
        q.innerHTML = questions[q_index].question;
        getAnswers(questions[q_index].incorrect_answers,questions[q_index].correct_answer);

        q_index++;
    })
}

