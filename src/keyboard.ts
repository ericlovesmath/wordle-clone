import { $keyboard, getCurrentRow, getKey, moveToNextRow } from './types';
import { POSSIBLE_WORDS } from './allowed-words-list';

export function createKeyboard(ans: string) {
  addKeysToRow('qwertyuiop', 0);
  addKeysToRow('asdfghjkl', 1);
  addSpecialKeysToRow('enter', 2, () => { checkWord(ans) });
  addKeysToRow('zxcvbnm', 2);
  addSpecialKeysToRow('delete', 2, removeLetter);
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    handleKeyPress(e, ans)
  });
}

function handleKeyPress(e: KeyboardEvent, ans: string) {
  if (e.repeat) return;
  if (e.key === "Enter") {
    checkWord(ans);
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

function createKey(char: string): HTMLDivElement {
  let key = document.createElement('div');
  key.classList.add('key');
  key.textContent = char;
  key.dataset.state = 'unchecked';
  key.id = char + '-key';
  key.onclick = () => { guessLetter(char) };
  return key;
}
function checkWord(ans: string) {

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
  let hints = getHints(ans, guess);
  console.log("hints: " + hints);
  colorKeyboardAndGrid(hints);


  moveToNextRow();
}

function colorKeyboardAndGrid(hints: number[]) {
  const $row = getCurrentRow()
  for (let i = 0; i < 5; i++) {
    let tile = $row.childNodes![i] as HTMLDivElement;
    let key = getKey(tile.textContent!);
    console.log(key);
    switch (hints[i]) {
      case 1:
        tile.dataset.state = 'solved';
        key.dataset.state = 'solved';
        break;
      case 2:
        tile.dataset.state = 'present';
        if (key.dataset.state !== 'solved') {
          key.dataset.state = 'present';
        }
        break;
      case 3:
        tile.dataset.state = 'absent';
        if (key.dataset.state !== 'solved' && key.dataset.state !== 'present') {
          key.dataset.state = 'absent';
        }
        break;
      default:
        console.log("Error in colorKeyboardAndGrids()");
    }
  }
}


function getHints(ans: string, guess: string): number[] {
  // 0 = Unchecked
  // 1 = Solved
  // 2 = Present
  // 3 = Absent
  let hints = [0, 0, 0, 0, 0];
  let remain_ans = [];

  // Check Solved
  for (let i = 0; i < 5; i++) {
    if (ans[i] === guess[i]) {
      hints[i] = 1;
    } else {
      remain_ans.push(ans[i]);
    }
  }

  // Check Present
  for (let i = 0; i < 5; i++) {
    if (hints[i] == 1) continue;
    let found_letter = remain_ans.indexOf(guess[i]);
    if (found_letter != -1) {
      remain_ans.splice(found_letter, 1);
      hints[i] = 2;
    }
  }

  // Check Absent
  for (let i = 0; i < 5; i++) {
    if (hints[i] == 0) hints[i] = 3;
  }

  return hints;

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

