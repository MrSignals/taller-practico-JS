const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
let canvasSize;
let elementSize;
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);
  elementSize = canvasSize / 10 - 1.5;
  startGame();
}

function startGame() {
  console.log({ canvasSize, elementSize });
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[2];
  const mapRows = map.trim().split("\n");

  const mapRowsColumns = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowsColumns });

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(
        emojis[mapRowsColumns[row - 1][col - 1]],
        elementSize * col,
        elementSize * row
      );
    }
  }
}
