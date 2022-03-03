const $gameBoard = document.querySelector<HTMLDivElement>('#game-board')!;
const $keyboard = document.querySelector<HTMLDivElement>('#keyboard')!;

const getCurrentRow = () => {
  return $gameBoard.querySelector<HTMLDivElement>('[data-state="current"]')!;
}

const moveToNextRow = () => {
  getCurrentRow().dataset.state = "solved";
  let new_row = $gameBoard.querySelector<HTMLDivElement>('[data-state="incomplete"]')!;
  new_row.dataset.state = "current";
}

export { $gameBoard, $keyboard, getCurrentRow, moveToNextRow };
