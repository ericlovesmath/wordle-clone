import './style.css';
import { POSSIBLE_WORDS } from './allowed-words-list';
import { POSSIBLE_ANSWERS } from './allowed-answers-list';

const $gameBoard = document.querySelector<HTMLDivElement>('#game-board')!;
const $keyboard = document.querySelector<HTMLDivElement>('#keyboard')!;

main()

function main() {

  let GUESS_LEN = 5;
  let GUESS_LIMIT = 6;

  initGrid(GUESS_LEN, GUESS_LIMIT);
  createKeyboard();

  console.log(chooseRandomAnswer());

  addGuess('A');

}

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
    row.dataset.state = "incomplete";
    game_rows.push(row);
  }
  game_rows[0].dataset.state = "current";
  return game_rows;
}

function createKeyboard() {

  [..."QWERTYUIOP"].forEach((c: string) => {
    $keyboard.children[0].appendChild(createKey(c));
  });
  [..."ASDFGHJKL"].forEach((c: string) => {
    $keyboard.children[1].appendChild(createKey(c));
  });

  let enter_key = createKey("enter");
  enter_key.classList.add('wide-key');
  $keyboard.children[2].appendChild(enter_key);

  [..."ZXCVBNM"].forEach((c: string) => {
    $keyboard.children[2].appendChild(createKey(c));
  });

  let delete_key = createKey("delete");
  delete_key.classList.add('wide-key');
  $keyboard.children[2].appendChild(delete_key);
}

function createKey(char: string): HTMLButtonElement {
  let key = document.createElement('button');
  key.classList.add('key');
  key.value = char;
  key.textContent = char;
  key.dataset.state = 'unused';
  key.onclick = function() {
    addGuess(char);
  };
  return key;
}

function addGuess(char: string) {
  console.log("Guessing Letter: " + char);
  const $row = $gameBoard.querySelector<HTMLDivElement>('[data-state="current"]')!.children!;
  for (let i = 0; i < 5; i++) {
    if ($row[i].textContent === '') {
      $row[i].textContent = char;
      return;
    }
  };
}

function chooseRandomAnswer(): string {
  return POSSIBLE_ANSWERS[Math.floor(Math.random() * POSSIBLE_ANSWERS.length)];
}
