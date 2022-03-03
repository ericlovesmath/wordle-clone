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
  addKeysToRow('QWERTYUIOP', 0);
  addKeysToRow('ASDFGHJKL', 1);
  addSpecialKeysToRow('enter', 2, checkWord);
  addKeysToRow('ZXCVBNM', 2);
  addSpecialKeysToRow('delete', 2, removeLetter);
}

function addSpecialKeysToRow(name: string, row: number, func: Function) {
  let key = createKey(name);
  key.classList.add('wide-key');
  key.onclick = () => { func() };
  $keyboard.children[row].appendChild(key);

}

function addKeysToRow(chars: string, row: number) {
  [...chars].forEach((char: string) => {
    $keyboard.children[row].appendChild(createKey(char));
  });
}

function createKey(char: string): HTMLButtonElement {
  let key = document.createElement('button');
  key.classList.add('key');
  key.value = char;
  key.textContent = char;
  key.dataset.state = 'unused';
  key.onclick = () => { guessLetter(char) };
  return key;
}

function checkWord() {

  console.log("Checking row...");

  const $row = getCurrentRow()
  let guess = '';
  for (let tile of $row.childNodes) {
    if (tile.textContent === '') {
      console.log("Row is incomplete");
      return;
    } else {
      guess += tile.textContent;
    }
  }

  if (!POSSIBLE_WORDS.has(guess.toLowerCase())) {
    console.log("Word not in dictionary");
    return;
  }

  // Since the word exists, time to give hints?

}

function getCurrentRow(): HTMLDivElement {
  return $gameBoard.querySelector<HTMLDivElement>('[data-state="current"]')!;
}

function guessLetter(char: string) {
  console.log("Adding Letter: " + char);

  const $row = getCurrentRow();
  const $tiles = $row.children!
  for (let i = 0; i < 5; i++) {
    if ($tiles[i].textContent === '') {
      $tiles[i].textContent = char;
      return;
    }
  };
}

function removeLetter() {
  console.log("Removing Letter");

  const $row = getCurrentRow();
  const $tiles = $row.children!
  for (let i = 4; i >= 0; i--) {
    if ($tiles[i].textContent !== '') {
      $tiles[i].textContent = '';
      return;
    }
  };
}

function chooseRandomAnswer(): string {
  return POSSIBLE_ANSWERS[Math.floor(Math.random() * POSSIBLE_ANSWERS.length)];
}
