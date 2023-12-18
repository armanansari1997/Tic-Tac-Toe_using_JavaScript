let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset');
let newGameBtn = document.querySelector('.new-game');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true; // playerX, playerO
let moveCount = 0;
let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if(turnO){
      box.classList.add('O');
      box.classList.remove('X');
      box.innerText = 'O';
      turnO = false;
    }
    else{
      box.classList.add('X');
      box.classList.remove('O');
      box.innerText = 'X';
      turnO = true;
    }
    box.disabled = true;
    moveCount++;
    checkWinner();
  })
});

const resetGame = () => {
  turnO = true;
  moveCount = 0;
  enableBoxes();
  msgContainer.classList.add('hide');
}

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = '';
  }
}

const showWinner = (winner) => {
  msgContainer.classList.remove('hide');
  msg.innerText = `Congratulations!!!, Winner is ${winner}`;
  disableBoxes();
  moveCount = 0;
}

const draw = () => {
  msgContainer.classList.remove('hide');
  msg.innerText = `It's a draw`;
  disableBoxes();
  moveCount = 0;
}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let firstVal = boxes[pattern[0]].innerText;
    let secondVal = boxes[pattern[1]].innerText;
    let thirdVal = boxes[pattern[2]].innerText;

    if (firstVal && secondVal && thirdVal){
      if (firstVal === secondVal && secondVal === thirdVal){
        showWinner(firstVal);
      }
    }
  }

  // check for a draw
  if (moveCount === boxes.length) {
    draw();
  }
}

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);