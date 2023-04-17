const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', (e) => {
  e.target.style['display'] = 'none';

  const gameSectionStyle = document.querySelector('.game-section').style;

  gameSectionStyle['display'] = 'flex';
  gameSectionStyle['flex-direction'] = 'column';
  gameSectionStyle['align-items'] = 'center';
});

