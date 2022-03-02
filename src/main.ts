import './style.css'

const $gameBoard = document.querySelector<HTMLDivElement>('#game-board')!;
const $keyboard = document.querySelector<HTMLDivElement>('#keyboard')!;

// Guess Grid

let GUESS_LEN = 5;
let GUESS_LIMIT = 6;

initGrid(GUESS_LEN, GUESS_LIMIT);
initKeyboard();

function initGrid(guess_len: number, guess_limit: number): HTMLDivElement[] {
  let game_rows: HTMLDivElement[] = [];
  for (let i = 0; i < guess_limit; i++) {
    let row = document.createElement('div');
    row.classList.add('game-row');
    for (let j = 0; j < guess_len; j++) {
      let tile = document.createElement('div');
      tile.classList.add('tile');
      row.appendChild(tile);
      $gameBoard.appendChild(row);
    }
    game_rows.push(row);
  }
  return game_rows;
}

function initKeyboard() {
  let key: HTMLDivElement;

  for (let i = 0; i < 10; i++) {
    key = document.createElement('div');
    key.classList.add('key');
    $keyboard.children[0].appendChild(key);
  }

  for (let i = 0; i < 9; i++) {
    key = document.createElement('div');
    key.classList.add('key');
    $keyboard.children[1].appendChild(key);
  }

  key = document.createElement('div');
  key.classList.add('key');
  key.classList.add('wide-key');
  $keyboard.children[2].appendChild(key);

  for (let i = 0; i < 7; i++) {
    key = document.createElement('div');
    key.classList.add('key');
    $keyboard.children[2].appendChild(key);
  }

  key = document.createElement('div');
  key.classList.add('key');
  key.classList.add('wide-key');
  $keyboard.children[2].appendChild(key);
}
