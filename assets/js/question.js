const queryString = window.location.search;
console.log(queryString);


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

    
function getAnswers (incorrect_answers, correct_answer) {
    const awnsers = document.querySelector('.awnsers');
    
    let awnser = document.createElement('li');
    awnser.classList.add('awnser');
    let awnser_text = document.createElement('p');
    
    awnser_text.innerHTML = correct_answer;
    awnser_text.value = correct_answer;

    let awnser_btn = document.createElement('button');
    awnser_btn.classList.add('marker');
    awnser.appendChild(awnser_btn);
    awnser.appendChild(awnser_text);
    awnsers.appendChild(awnser);

    for (let index = 0; index <  incorrect_answers.length; index++) {

        let awnser = document.createElement('li');
        awnser.classList.add('awnser');
        let awnser_text = document.createElement('p');

        let awnser_btn = document.createElement('button');
        awnser_btn.classList.add('marker');
        awnser_text.innerHTML = incorrect_answers[index];
        awnser_text.value = incorrect_answers[index];
        
        awnser.appendChild(awnser_btn);
        awnser.appendChild(awnser_text);
        awnsers.appendChild(awnser);
    }
}

const q_type = document.querySelector('.question_type');
const q_count = document.querySelector('.count');
const q = document.querySelector('.question');
const next_btn = document.querySelector('.next');

function useAPIdata(questions) {
    q_type.innerHTML = questions[0].category + ", " + questions[0].difficulty;
    q_count.innerHTML = '1/' + questions.length;
    q.innerHTML = questions[0].question; 
    console.log(questions);

    
    
    getAnswers(questions[0].incorrect_answers,questions[0].correct_answer);
}

