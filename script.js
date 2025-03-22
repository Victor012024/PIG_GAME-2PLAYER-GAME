"use strict"

// selecting elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// starting conditions
let scores, activePlayer, currentScore, playing;


const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEl.classList.add("hidden");
  player0.classList.remove(`player--winner`);
  player1.classList.remove(`player--winner`);
  player0.classList.add(`player--active`);
  player1.classList.remove(`player--active`);
}
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

// rollind dice funxtionality
btnRoll.addEventListener("click", function () {
  diceEl.classList.add("rolling"); // Add rolling class to trigger animation
  if (playing) {
    // 1. generating random dice roll
    setTimeout(() => {
      diceEl.classList.remove("rolling"); // Remove the class to reset animation
    }, 1000); // Adjust timeout to match animation duration


    const dice = Math.trunc(Math.random() * 6) + 1;


    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;


    // 3. check for rolled 1: if true, 
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // switch to next player;
      switchPlayer();
    };
  };
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      // finish the game
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      switchPlayer();
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
})

btnNew.addEventListener('click', init);
