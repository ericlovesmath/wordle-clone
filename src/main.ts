import './style.css'

const $gameContainer = document.querySelector<HTMLDivElement>('#board-container')!;

let tile = document.createElement('div');
tile.classList.add('tile');
$gameContainer.appendChild(tile);
