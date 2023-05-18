const SQUARE = document.querySelectorAll('.square');
const MOLE = document.querySelectorAll('.mole');
const TIMELEFT = document.querySelector('#time-left');
let score = document.querySelector('#score');

let result = 0;
let currentTime = TIMELEFT.textContent;
function randomSquare() {
    SQUARE.forEach(className => {
        className.classList.remove('mole');
    })

    let randomPosition = SQUARE[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');

    //assign the if the randomPosition to hitPosition to use later
    hitPosition = randomPosition.id;
}

SQUARE.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    })
})

function moveMole() {
    let timerId = null;
    timerId = setInterval(randomSquare, 1000);
}

moveMole();

function countDown() {
    currentTime--;
    TIMELEFT.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerId);
        alert('GAME OVER! your final score is' + result);
    }
}

let timerId = setInterval(countDown, 1000);