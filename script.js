"use strict";

let isOver = false,
  playerTurn = "X",
  gameCount = 0,
  scoreX = 0,
  scoreO = 0;

const winnerStatus = document.getElementById("status");
const xScoreEL = document.getElementById("x_score");
const oScoreEL = document.getElementById("o_score");
const cells = document.querySelectorAll(".cell");

function play(cell) {
  if (isOver || cell.innerHTML) {
    return;
  }
  gameCount++;

  cell.innerHTML = playerTurn.toUpperCase();

  playerTurn = playerTurn == "X" ? "O" : "X";
  winnerStatus.innerHTML = `Player ${playerTurn}'s Turn`;

  checkWin();

  if (!isOver && gameCount == 9) {
    gameOver("draw");
  }
}

function checkWin() {
  const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  for (const win of wins) {
    let [a, b, c] = win;
    a--;
    b--;
    c--;
    if (
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[b].innerHTML === cells[c].innerHTML &&
      (cells[a].innerHTML === "X" || cells[a].innerHTML === "O") &&
      !isOver
    ) {
      //   winning logic
      highlightWin(cells[a], cells[b], cells[c]);
      gameOver(cells[a].innerHTML);
    }
  }
}
function highlightWin(cell1, cell2, cell3) {
  cell1.classList.add("win");
  cell2.classList.add("win");
  cell3.classList.add("win");
}

function gameOver(winner) {
  let msg;

  if (winner === "draw") {
    msg = "It's a Draw!";
  } else if (winner === "X") {
    msg = "X Wins!";
    scoreX++;
  } else {
    msg = "O Wins!";
    scoreO++;
  }

  xScoreEL.innerHTML = `X : ${scoreX}`;
  oScoreEL.innerHTML = `O : ${scoreO}`;
  winnerStatus.innerHTML = msg;
  isOver = true;
}

function resetGame() {
  playerTurn = "X";
  isOver = false;
  gameCount = 0;
  for (const cell of cells) {
    cell.innerHTML = "";
    cell.className = "cell";
  }
  winnerStatus.innerHTML = "Player X's Turn";
}
