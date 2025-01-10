// script.js
const gameArea = document.getElementById('game-area');
const typingInput = document.getElementById('typing-input');
const scoreDisplay = document.getElementById('score-display');
const levelDisplay = document.getElementById('level-display');
const livesDisplay = document.getElementById('lives-display');

let score = 0;
let lives = 3;
let words = [];
let gameInterval;
let wordSpeed = 3000; // Slower speed for easy level

// Sample word list
const wordList = ['ninja', 'samurai', 'dojo', 'katana', 'shuriken', 'warrior', 'shadow'];

// Function to create and drop a word
function createWord() {
  const word = document.createElement('div');
  word.className = 'word';
  word.textContent = wordList[Math.floor(Math.random() * wordList.length)];
  word.style.left = `${Math.random() * (gameArea.offsetWidth - 100)}px`;
  gameArea.appendChild(word);
  words.push(word);

  // Drop the word
  let topPosition = 0;
  const dropInterval = setInterval(() => {
    if (topPosition >= gameArea.offsetHeight) {
      clearInterval(dropInterval);
      gameArea.removeChild(word);
      words = words.filter(w => w !== word);

      // Decrease a life if a word reaches the bottom
      loseLife();
    } else {
      topPosition += 1; // Slow movement for easy level
      word.style.top = `${topPosition}px`;
    }
  }, 20);
}

// Function to lose a life
function loseLife() {
  lives--;
  livesDisplay.textContent = `Lives: ${lives}`;
  if (lives <= 0) {
    alert('Game Over! Final Score: ' + score);
    resetGame();
  }
}

// Check for typed word
typingInput.addEventListener('input', () => {
  const typedWord = typingInput.value.trim();
  const matchingWord = words.find(w => w.textContent === typedWord);

  if (matchingWord) {
    gameArea.removeChild(matchingWord);
    words = words.filter(w => w !== matchingWord);
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    typingInput.value = '';
  }
});

// Start the game
function startGame() {
  score = 0;
  lives = 3;
  scoreDisplay.textContent = `Score: ${score}`;
  livesDisplay.textContent = `Lives: ${lives}`;
  levelDisplay.textContent = `Level: Easy`;
  gameInterval = setInterval(createWord, wordSpeed);
}

// Reset the game
function resetGame() {
  clearInterval(gameInterval);
  words.forEach(word => gameArea.removeChild(word));
  words = [];
  typingInput.value = '';
  startGame();
}

// Initialize the game
startGame();
