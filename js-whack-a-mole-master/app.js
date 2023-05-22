const SQUARE = document.querySelectorAll('.square');
const MOLE = document.querySelectorAll('.mole');
const TIMELEFT = document.querySelector('#time-left');
let score = document.querySelector('#score');

let result = 0;
let currentTime = TIMELEFT.textContent;
let prevIndex = -1;
let hitPosition = null;
function randomSquare() {
    if (prevIndex >= 0) {
        SQUARE[prevIndex].classList.remove("mole");
    }
    prevIndex = Math.floor(Math.random() * 9);
    let randomPosition = SQUARE[prevIndex];
    randomPosition.classList.add('mole');

    //assign the if the randomPosition to hitPosition to use later
    hitPosition = randomPosition.id;
    
}

SQUARE.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition) {
            result++;
            score.textContent = result;
            id.classList.remove("mole");
            hitPosition = null;
        }
    })
})

function countDown() {
    currentTime--;
    TIMELEFT.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerMoleId);
        clearInterval(timerId);
        alert('GAME OVER! your final score is' + result);
    }
}

let timerMoleId = setInterval(randomSquare, 1000);;
let timerId = setInterval(countDown, 1000);
