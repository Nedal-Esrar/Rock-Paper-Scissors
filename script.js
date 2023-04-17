const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', (e) => {
  e.target.style['display'] = 'none';

  const gameSection = document.querySelector('.game-section');

  gameSection.style['display'] = 'inline-block';
});