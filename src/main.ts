import './style.css';

import { POSSIBLE_ANSWERS } from './allowed-answers-list';
import { createKeyboard } from './keyboard';
import { $gameBoard } from './types';

main()

function main() {

  let GUESS_LEN = 5;
  let GUESS_LIMIT = 6;

  let ANSWER = chooseRandomAnswer();

  createGrid(GUESS_LEN, GUESS_LIMIT);
  createKeyboard(ANSWER);

  console.log(`Answer: ${ANSWER}`);
}

function createGrid(guess_len: number, guess_limit: number) {
  for (let i = 0; i < guess_limit; i++) {
    let row = document.createElement('div');
    row.classList.add('game-row');
    for (let j = 0; j < guess_len; j++) {
      let tile = document.createElement('div');
      tile.classList.add('tile');
      tile.dataset.state = 'unchecked';
      row.appendChild(tile);
    }
    row.dataset.state = i == 0 ? 'current' : 'incomplete';
    $gameBoard.appendChild(row);
  }
}

function chooseRandomAnswer(): string {
  return POSSIBLE_ANSWERS[Math.floor(Math.random() * POSSIBLE_ANSWERS.length)];
}
