var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;
var inProgress = true;
var wasRolled = false;
var doubles = 0;
const win = 100;

const lostPointsMessage = 'Oh No! You Lost Your Points!';
const lostTurnMessage = 'Oh No! You Lost Your Turn!';
const twoSixes = 'You rolled two doubles and lost all your points!';
const winnerMessage = ' You Win!';
const dice1DOM = document.querySelector('.dice1');
const dice2DOM = document.querySelector('.dice2');
const alertDOM = document.querySelector('.alert');

init();

document.querySelector("#btn-roll").addEventListener('click', () => {
    if(inProgress) {
        toggleDisplay();
        animateIcon(".ion-ios-loop");
        animateDice();
        setTimeout(() => {
            var dice = rollDice();
            if(dice[0] != 1 && dice[1] != 1) {
                if(dice[0] === dice[1]) doubles++;
                if(doubles === 2) {
                    scores[activePlayer] = 0;
                    document.querySelector("#score" + activePlayer).textContent = '0';
                    flashMessage(twoSixes);
                    switchPlayer();
                } else {
                    roundScore += dice[0] + dice[1];
                    document.querySelector("#current" + activePlayer).textContent = roundScore;
                }
            } else {
                const message = roundScore === 0 ? lostTurnMessage : lostPointsMessage;
                flashMessage(message);
                switchPlayer();
            }
        }, 500);
        wasRolled = true;
    }
});

document.querySelector("#btn-hold").addEventListener('click', () => {
    if(inProgress && wasRolled) {
        scores[activePlayer] += roundScore;
        document.querySelector("#score" + activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >= win) {
            winGame();
        } else {
            switchPlayer();
        }
    }
});

document.querySelector('#btn-new').addEventListener('click', init);

function toggleDisplay() {
    alertDOM.style.display = 'none';
    dice1DOM.style.display = 'block';
    dice2DOM.style.display = 'block';
}

function winGame() {
    inProgress = false;
    document.querySelector('#name' + activePlayer).classList.add('winner');
    document.querySelector('#name' + activePlayer).textContent = 'Winner!';
}

function rollDice() {
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    dice1DOM.src = "dice-" + dice1 + ".png";
    dice2DOM.src = "dice-" + dice2 + ".png";
    return [dice1, dice2];
}

function clearScores() {
    document.querySelector("#current0").textContent = '0';
    document.querySelector("#current1").textContent = '0';
    document.querySelector("#score0").textContent = '0';
    document.querySelector("#score1").textContent = '0';
}

function switchPlayer() {
    wasRolled = false;
    doubles = 0;
    roundScore = 0;
    document.querySelector("#current" + activePlayer).textContent = roundScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    toggleActive();
}

function displayOff() {
    dice1DOM.style.display = 'none';
    dice2DOM.style.display = 'none';
    alertDOM.style.display = 'none';
}

function toggleActive() {
    document.querySelector('#player0').classList.toggle('active');
    document.querySelector('#player1').classList.toggle('active');
}

function flashMessage(message) {
    alertDOM.style.display = 'block';
    alertDOM.textContent = message;
}

function animateDice() {
    var interval = setInterval(rollDice, 50);
    setTimeout(() => {
        clearInterval(interval);
    }, 500);
}

function animateIcon(selector) {
    document.querySelector(selector).classList.toggle('animate');
    setTimeout(() => {
        document.querySelector(selector).classList.toggle('animate');
    }, 500);
}

function init() {
    displayOff();
    clearScores();
    document.querySelector('#name' + activePlayer).classList.remove('winner');
    document.querySelector('#name' + activePlayer).textContent = 'Player ' + (activePlayer + 1);
    if(activePlayer === 1) toggleActive();
    scores[0] = 0;
    scores[1] = 0;
    roundScore = 0;
    activePlayer = 0;
    inProgress = true;
    wasRolled = false;
}


