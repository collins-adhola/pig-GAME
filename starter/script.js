'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

///Initialise score

//Store current score

let scores, currentScore, activePlayer, playing;

let init = function () {
  scores = [0, 0]; // These are the final big scores which keep accumulating.
  currentScore = 0;
  activePlayer = 0; //This is the first player at position 0
  playing = true; //This helps us stop the game later

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden'); //Hide dice
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Make the first player active
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Reveal Randon number.
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. if number is 1, turn score to zero
    if (dice !== 1) {
      // Add scores to current dice
      currentScore += dice;
      //ID  Name built dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      //+++++++++ This code switch player but avoid repeat++ so i am making function instead.
      // document.getElementById(`current--${activePlayer}`).textContent = 0;

      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;

      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Hold score of current user
    scores[activePlayer] += currentScore; //if its player 0 or 1 as per array scores
    //Above same as score[1] = score[1] + current score

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. add score to active player and switch player
    //Player that reaches >= 100 wins.

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
//+++++++++ Dont repeat yourself ++ so i am making function instead.

// document.getElementById(`current--${activePlayer}`).textContent = 0;

// activePlayer = activePlayer === 0 ? 1 : 0;
// currentScore = 0;

// player0El.classList.toggle('player--active');
// player1El.classList.toggle('player--active');

//3.Move to next player..but now covered in function
// player0El.classList.toggle('player--active');
// player1El.classList.toggle('player--active');

//Resetting Game back to Beginning.
btnNew.addEventListener('click', init);

//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');

//   // Make the first player active
//   player0El.classList.add ('player--active');
//   player1El.classList.remove('player--active');

// })
