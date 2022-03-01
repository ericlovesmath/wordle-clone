import './style.css'

const $gameContainer = document.querySelector<HTMLDivElement>('#board-container')!;

let game_rows: HTMLDivElement[] = [];
for (let i = 0; i < 6; i++) {
  let row = document.createElement('div');
  row.classList.add('game-row');
  for (let j = 0; j < 5; j++) {
    let tile = document.createElement('div');
    tile.classList.add('tile');
    row.appendChild(tile);
    $gameContainer.appendChild(row);
  }
  game_rows.push(row);
  console.log("ahh");
}
console.log("done");

