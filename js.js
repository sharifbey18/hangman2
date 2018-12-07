// reference to dom elements
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

// variables for game
var wordBank = ['ice cube', 'snoop dog', 'pimp c', 'big boi', 'krit', 'j cole', 'bun b', 'birdman'];
var wins = 0;
var losses = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessLetterBank = [];
var incorrectLetterBank = [];

// newGame function to reset all stats, pick new word and creat placeholders.
function newGame () {
  // reset all game info
  gameRunning = true;
  guessesLeft = 8;
  guessLetterBank = [];
  incorrectLetterBank = [];
  pickedWordPlaceholderArr = [];

  pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

  // placeholders for the pickWord
  for (var i = 0; i < pickedWord.length; i++) {
    if (pickedWord[i] === ' ') {
      pickedWordPlaceholderArr.push(' ')
    } else {
      pickedWordPlaceholderArr.push('_');
    }
  }
  // write to the dom

  $guessesLeft.textContent = guessesLeft;
  $placeholders.textContent = pickedWordPlaceholderArr.join('');
  $guessedLetters.textContent = incorrectLetterBank;
}

// guess letters

function letterGuess (letter) {
  console.log(letter);

  if (gameRunning === true && guessLetterBank.indexOf(letter) === -1) {
    // running the game here
    guessLetterBank.push(letter);

    // check if guess letter
    for (var i = 0; pickedWord.length > 1; i++) {
      if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
        pickedWordPlaceholderArr[i] = pickedWord[i];
      }
    }

    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    checkIncorrect(letter);
  } else {
    if (!gameRunning) {
      alert("The game isn't running, Click on the New Game button to start over.");
    } else {
      alert("You've already guessed this letter, try a new one!");
    }
  }
}

function checkIncorrect (letter) {
  if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
      pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
    guessesLeft--;
    incorrectLetterBank.push(letter);
    guessedLetters.textContent = incorrectLetterBank.join(' ');
    guessesLeft.textContent = guessesLeft;
  }
}

function checkLoss () {
  if (guessesLeft === 0) {
    losses++
    gameRunning = false
    $losses.textContent = losses
  }
}
checkWin()

function checkWin () {
  if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join(' ').toLowerCase()) {
    wins++ 
    gameRunning = false
    $wins.textContent = wins
  }
}
// check letter function

// check if losing

// check if win

// add event listener for new game button
$newGameButton.addEventListener('click', newGame);

//  add keyup event
document.onkeyup = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    guessedLetters(event.key);
  }
}
