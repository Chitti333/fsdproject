const gameArea = document.getElementById('game-area');
const typingInput = document.getElementById('typing-input');
const scoreDisplay = document.getElementById('score-display');
const levelDisplay = document.getElementById('level-display');
const livesDisplay = document.getElementById('lives-display');
const nextLevelButton = document.getElementById('next-level');

let score = 0;
let lives = 3;
let level = 1;
let words = [];
let wordCategories = {}; // Object to store words categorized by length
let gameInterval;
let wordSpeed = 3000; // Base speed, can be adjusted for difficulty

// CSV file input listener
document.getElementById('csvFileInput').addEventListener('change', handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const csvData = e.target.result;
      wordCategories = parseCSV(csvData);  // Parse CSV and load words into wordCategories
      startGame();  // Start the game after loading the words
    };
    reader.readAsText(file);
  } else {
    alert('No file selected');
  }
}

// Function to parse CSV data and load it into wordCategories object
function parseCSV(csvData) {
  const rows = csvData.split('\n').filter(row => row.trim() !== ''); // Split rows and remove empty lines
  const parsedData = rows.reduce((categories, row) => {
    const wordsInRow = row.split(',').map(cell => cell.trim());
    const wordLength = wordsInRow[0].length; // Use the length of the first word as the category
    if (!categories[wordLength]) {
      categories[wordLength] = [];
    }
    categories[wordLength].push(...wordsInRow);
    return categories;
  }, {});

  return parsedData;
}

// Function to set words for the current level
function setWordsForLevel() {
  words = wordCategories[level] || [];
  if (words.length === 0) {
    alert('No words available for this level!');
    resetGame();
  }
}

// Function to create and drop a word
function createWord() {
  if (words.length === 0) return; // Ensure words are available
  const word = document.createElement('div');
  word.className = 'word';
  word.textContent = words[Math.floor(Math.random() * words.length)];
  word.style.left = `${Math.random() * (gameArea.offsetWidth - 100)}px`;
  gameArea.appendChild(word);

  // Drop the word
  let topPosition = 0;
  const dropInterval = setInterval(() => {
    if (topPosition >= gameArea.offsetHeight) {
      clearInterval(dropInterval);
      gameArea.removeChild(word);
      loseLife();
    } else {
      topPosition += 1; // Adjust this for difficulty
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
  const matchingWord = [...gameArea.children].find(w => w.textContent === typedWord);

  if (matchingWord) {
    gameArea.removeChild(matchingWord);
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    typingInput.value = '';
  }
});

// Function to advance to the next level
nextLevelButton.addEventListener('click', () => {
  level++;
  levelDisplay.textContent = `Level: ${level}`;
  setWordsForLevel();
});

// Start the game
function startGame() {
  score = 0;
  lives = 3;
  level = 1;
  scoreDisplay.textContent = `Score: ${score}`;
  livesDisplay.textContent = `Lives: ${lives}`;
  levelDisplay.textContent = `Level: ${level}`;
  setWordsForLevel();
  gameInterval = setInterval(createWord, wordSpeed);
}

// Reset the game
function resetGame() {
  clearInterval(gameInterval);
  gameArea.innerHTML = '';
  typingInput.value = '';
  startGame();
}

// Initialize the game (now starts after CSV is loaded)
