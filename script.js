const startButton = document.getElementById('start-btn');

startButton.addEventListener('click', (e) => {
  e.target.style['display'] = 'none';

  const gameSectionStyle = document.querySelector('.game-section').style;

  gameSectionStyle['display'] = 'flex';
  gameSectionStyle['flex-direction'] = 'column';
  gameSectionStyle['align-items'] = 'center';
});

let choices = ['✊', '✋', '✌️'];

let playerScore = 0;
let computerScore = 0;

const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scrsBtn = document.getElementById('scrs-btn');

const roundResultLabel = document.querySelector('.round-result');

const playerChoiceLabel = document.querySelector('.player-choice')
const cmpLabel = document.querySelector('.cmp')
const computerChoiceLabel = document.querySelector('.computer-choice')

const playerScoreLabel = document.querySelector('.player-score');
const computerScoreLabel = document.querySelector('.computer-score');

const gameOverModal = document.querySelector('.game-over-modal');
const gameOverMsg = document.querySelector('.game-over-msg');

const overlay = document.querySelector('.overlay');

const playAgainBtn = document.getElementById('play-again-btn');

const resetBtn = document.getElementById('reset-btn');

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}

function getRandomChoice() {
  return Math.floor(Math.random() * 3);
}

function updateChoiceLabels(playerChoice, computerChoice) {
  playerChoiceLabel.innerHTML = `<div class="symbol">${choices[playerChoice]}</div>`;
  computerChoiceLabel.innerHTML = `<div class="symbol">${choices[computerChoice]}</div>`;
}

function setResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    roundResultLabel.textContent = 'Tie!';
    cmpLabel.textContent = '=';
  }
  else if (playerChoice === (computerChoice + 1) % 3) {
    roundResultLabel.textContent = 'Player Wins this Round!';
    cmpLabel.textContent = '>';
  }
  else {
    roundResultLabel.textContent = 'Computer Wins this Round!';
    cmpLabel.textContent = '<';
  }
}

function updateScore(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return;
  }
  else if (playerChoice === (computerChoice + 1) % 3) {
    playerScoreLabel.textContent = ++playerScore;
  }
  else {
    computerScoreLabel.textContent = ++computerScore;
  }
}

function showGameOverModal() {
  gameOverModal.classList.add('active');
  overlay.classList.add('active');
}

function setGameOverMessage() {
  gameOverMsg.textContent = playerScore === 5 ? "Player Wins!" : "Computer Wins!";
}

function handleClick(playerChoice) {
  if (isGameOver()) {
    showGameOverModal();

    return;
  }

  const computerChoice = getRandomChoice();

  updateChoiceLabels(playerChoice, computerChoice);

  setResult(playerChoice, computerChoice);

  updateScore(playerChoice, computerChoice);

  if (isGameOver()) {
    showGameOverModal();

    // set modal message for once.
    setGameOverMessage();

    return;
  }

  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scrsBtn.disabled = true;

  setTimeout(() => {
    // Reset Choices and Result.
    roundResultLabel.textContent = 'Pick One!';

    playerChoiceLabel.innerHTML = '<div class="symbol">.</div>';
    computerChoiceLabel.innerHTML = '<div class="symbol">.</div>';
    cmpLabel.textContent = '';

    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scrsBtn.disabled = false;
  }, 800);
}

function reset() {
  playerScore = computerScore = 0;

  roundResultLabel.textContent = 'Pick One!';

  playerChoiceLabel.innerHTML = '<div class="symbol">.</div>';
  computerChoiceLabel.innerHTML = '<div class="symbol">.</div>';
  cmpLabel.textContent = '';

  playerScoreLabel.textContent = 0;
  computerScoreLabel.textContent = 0;
}

function hideGameOverModal() {
  gameOverModal.classList.remove('active');
  overlay.classList.remove('active');
}

rockBtn.addEventListener('click', () => handleClick(0));
paperBtn.addEventListener('click', () => handleClick(1));
scrsBtn.addEventListener('click', () => handleClick(2));

playAgainBtn.addEventListener('click', () => reset());
playAgainBtn.addEventListener('click', () => hideGameOverModal());
resetBtn.addEventListener('click', () => reset());

overlay.addEventListener('click', () => hideGameOverModal());
