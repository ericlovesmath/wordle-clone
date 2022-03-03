const $gameBoard = document.querySelector<HTMLDivElement>('#game-board')!;
const $keyboard = document.querySelector<HTMLDivElement>('#keyboard')!;

const getCurrentRow = () => {
  return $gameBoard.querySelector<HTMLDivElement>('[data-state="current"]')!;
}

export { $gameBoard, $keyboard, getCurrentRow };
