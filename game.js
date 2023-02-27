const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
let canvasSize;
let elementSize;
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);
  elementSize = canvasSize / 10 - 1;
  startGame();
}

function startGame() {
  console.log({ canvasSize, elementSize });
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[0];

  //Funcion que nos permite quitar espacios en blancos, donde el inicio y final de un elemento sera cuando haya un salto de linea
  const mapRows = map.trim().split("\n");
  const mapRowsColumns = mapRows.map((row) => row.trim().split("")); // A partir de del nuevo array usando el .map creamos otro array pero sin espacios en blancos
  console.log({ map, mapRows, mapRowsColumns });

  //REFACTOR
  mapRowsColumns.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementSize * (colIndex + 1) + 14;
      const poxY = elementSize * (rowIndex + 1);
      game.fillText(emoji, posX, poxY);
      console.log({ col, colIndex, row, rowIndex });
    });
  });

  /*  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(
        emojis[mapRowsColumns[row - 1][col - 1]],
        elementSize * col + 15,
        elementSize * row
      );
    }
  } */
}
