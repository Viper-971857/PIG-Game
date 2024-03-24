'use strict';
// SELECTING ELEMENTS
const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');

let scoreElement0 = document.querySelector('#score--0');
let scoreElement1 = document.getElementById('score--1');

const currentScoreElement0 = document.getElementById('current--0');
const currentScoreElement1 = document.querySelector('current--1');

const diceElement = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score;
let currentScore;
let activePlayer;
let playing;
// let dice

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;

  diceElement.classList.add('hidden');

  currentScoreElement0.textContent = 0;
  // currentScoreElement1.textContent = 0;

  playerElement0.classList.remove('player--winner');
  playerElement1.classList.remove('player--winner');

  playerElement0.classList.add('player--active');
  playerElement1.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerElement0.classList.toggle('player--active');
  playerElement1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1 GENRATING RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2 DISPLAY DICE
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // 3 CHECK FOR ROLL 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

// HOLD THE SCORES

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1 ADDING SCORE TO CUREENT PLAYER SCORE
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2 CHECK IF PLAYER >= 30 THEN FINISH THE GAME
    if (score[activePlayer] >= 30) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceElement.classList.add('hidden');
    } else {
      //  3 switch to next player
      switchPlayer();
    }
  }
});

// RESETTING THE GAME
btnNew.addEventListener('click', init);
