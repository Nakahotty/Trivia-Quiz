
let result = localStorage.getItem('result');
let numOfQuestions = localStorage.getItem('numOfQuestions');
let category = localStorage.getItem('category');
let difficulty = localStorage.getItem('difficulty');

document.getElementById('score').innerHTML = result + '/' + numOfQuestions;
document.getElementById('difficulty').innerHTML = difficulty;
document.getElementById('category').innerHTML = category;

let average = Math.round((result * 100) / numOfQuestions);
let progress = document.querySelector('.progress-circle');
let progressPercentage = 'progress-' + average; 
progress.classList.add(progressPercentage);

let progressSpan = document.querySelector('.progress-circle span');
progressSpan.innerHTML = average;