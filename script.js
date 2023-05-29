const startButton = document.getElementById("start-btn");

startButton.addEventListener("click", (e) => {
  e.target.style["display"] = "none";

  const gameSectionStyle = document.querySelector(".game-section").style;

  gameSectionStyle["display"] = "flex";
  gameSectionStyle["flex-direction"] = "column";
  gameSectionStyle["align-items"] = "center";
});

const choices = ["✊", "✋", "✌️"];

let playerScore = 0;
let computerScore = 0;

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scrsBtn = document.getElementById("scrs-btn");

const roundResultLabel = document.querySelector(".round-result");

const playerChoiceSymbol = document.querySelector(".player-choice .symbol");
const cmpLabel = document.querySelector(".cmp");
const computerChoiceSymbol = document.querySelector(".computer-choice .symbol");

const playerScoreLabel = document.querySelector(".player-score");
const computerScoreLabel = document.querySelector(".computer-score");

const gameOverModal = document.querySelector(".game-over-modal");
const gameOverMsg = document.querySelector(".game-over-msg");

const overlay = document.querySelector(".overlay");

const playAgainBtn = document.getElementById("play-again-btn");

const resetBtn = document.getElementById("reset-btn");

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}

function getRandomChoice() {
  return Math.floor(Math.random() * 3);
}

function updateChoiceSymbols(playerChoice, computerChoice) {
  playerChoiceSymbol.textContent = choices[playerChoice];
  computerChoiceSymbol.textContent = choices[computerChoice];
}

function setResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    cmpLabel.textContent = "=";
    roundResultLabel.textContent = "Tie!";
  } else if (playerChoice === (computerChoice + 1) % 3) {
    cmpLabel.textContent = ">";
    roundResultLabel.textContent = "Player Wins this Round!";
  } else {
    cmpLabel.textContent = "<";
    roundResultLabel.textContent = "Computer Wins this Round!";
  }
}

function updateScore(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return;
  } else if (playerChoice === (computerChoice + 1) % 3) {
    playerScoreLabel.textContent = ++playerScore;
  } else {
    computerScoreLabel.textContent = ++computerScore;
  }
}

function showGameOverModal() {
  gameOverModal.classList.add("active");
  overlay.classList.add("active");
}

function hideGameOverModal() {
  gameOverModal.classList.remove("active");
  overlay.classList.remove("active");
}

function setGameOverMessage() {
  gameOverMsg.textContent =
    playerScore === 5 ? "Player Wins!" : "Computer Wins!";
}

function resetRound() {
  roundResultLabel.textContent = "Pick One!";

  playerChoiceSymbol.textContent = ".";
  computerChoiceSymbol.innerHTML = ".";
  cmpLabel.textContent = "";
}

function disablePlayBtns() {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scrsBtn.disabled = true;
}

function enablePlayBtns() {
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scrsBtn.disabled = false;
}

function handleClick(playerChoice) {
  if (isGameOver()) {
    showGameOverModal();

    return;
  }

  let computerChoice = getRandomChoice();

  updateChoiceSymbols(playerChoice, computerChoice);

  setResult(playerChoice, computerChoice);

  updateScore(playerChoice, computerChoice);

  if (isGameOver()) {
    showGameOverModal();

    // set modal message once.
    setGameOverMessage();

    return;
  }

  disablePlayBtns();

  setTimeout(() => {
    resetRound();

    enablePlayBtns();
  }, 1000);
}

function reset() {
  playerScore = computerScore = 0;

  resetRound();

  playerScoreLabel.textContent = 0;
  computerScoreLabel.textContent = 0;
}

rockBtn.addEventListener("click", () => handleClick(0));
paperBtn.addEventListener("click", () => handleClick(1));
scrsBtn.addEventListener("click", () => handleClick(2));

playAgainBtn.addEventListener("click", () => reset());
playAgainBtn.addEventListener("click", () => hideGameOverModal());

resetBtn.addEventListener("click", () => reset());

overlay.addEventListener("click", () => hideGameOverModal());
