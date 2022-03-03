import { $keyboard, getCurrentRow } from './types';
import { POSSIBLE_WORDS } from './allowed-words-list';

export function createKeyboard() {
  addKeysToRow('qwertyuiop', 0);
  addKeysToRow('asdfghjkl', 1);
  addSpecialKeysToRow('enter', 2, checkWord);
  addKeysToRow('zxcvbnm', 2);
  addSpecialKeysToRow('delete', 2, removeLetter);
  document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(e: KeyboardEvent) {
  if (e.repeat) return;
  if (e.key === "Enter") {
    checkWord();
  } else if (e.key === "Backspace" || e.key === "Delete") {
    removeLetter();
  } else if (e.key.match(/^[a-z]$/)) {
    guessLetter(e.key);
  }
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
    console.log(`"${guess}" not found in dictionary`);
    return;
  }

  console.log(`"${guess}" found in dictionary`);

  // Since the word exists, time to give hints?

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

