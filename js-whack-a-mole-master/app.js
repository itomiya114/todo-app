const SQUARE = document.querySelectorAll('.square');
const MOLE = document.querySelectorAll('.mole');
const TIMELEFT = document.querySelector('#time-left');
const SQUARE_LENGTH = SQUARE.length;
let score = document.querySelector('#score');
let result = 0;
let currentTime = TIMELEFT.textContent;
let hitPosition = null;
SQUARE.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition) {
            result++;
            score.textContent = result;
             removeMole(id.id);
        }
    })
})
let timerMoleId = setInterval(randomSquare, 1000);
let timerId = setInterval(countDown, 1000);
function removeMole(id){
    document.getElementById(id).classList.remove("mole");
    hitPosition = null;
}
function randomSquare() {
    if (hitPosition) {
        removeMole(hitPosition);
    }
    let randomPosition = SQUARE[Math.floor(Math.random() *  SQUARE_LENGTH)];
    randomPosition.classList.add('mole');

    //assign the if the randomPosition to hitPosition to use later
    hitPosition = randomPosition.id;
    
}

function countDown() {
    currentTime--;
    TIMELEFT.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerMoleId);
        clearInterval(timerId);
        if (hitPosition) {
            removeMole(hitPosition);
        }
        alert('GAME OVER! your final score is' + result);
    }
}


