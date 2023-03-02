const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecords = document.querySelector("#record");
const pResultado = document.querySelector("#resultado");

let canvasSize;
let elementSize;
let lives = 3;
let level = 0;

let timeStart;
let timePlaying;
let timeInterval;
const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

let bombs = [];
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnRight = document.querySelector("#right");
const btnLeft = document.querySelector("#left");

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

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function startGame() {
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecords();
  }

  //Funcion que nos permite quitar espacios en blancos, donde el inicio y final de un elemento sera cuando haya un salto de linea
  const mapRows = map.trim().split("\n");
  const mapRowsColumns = mapRows.map((row) => row.trim().split("")); // A partir de del nuevo array usando el .map creamos otro array pero sin espacios en blancos
  showLives();
  /* showRecords(); */
  bombs = [];
  game.clearRect(0, 0, canvasSize, canvasSize);
  //REFACTOR
  mapRowsColumns.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementSize * (colIndex + 1) + 14;
      const posY = elementSize * (rowIndex + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == "X") {
        bombs.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });
  console.log({ bombs });
  movePlayer();
}

function movePlayer() {
  const giftColosionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftColosionY =
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftColosion = giftColosionX && giftColosionY;

  if (giftColosion) {
    levelWin();
  }

  const enemyColision = bombs.find((enemy) => {
    const enemyColisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyColisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);

    return enemyColisionX && enemyColisionY;
  });

  if (enemyColision) {
    levelFail();
  }
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  level++;
  startGame();
}

function levelFail() {
  lives--;
  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}
function gameWin() {
  console.log("Acabaste el juego");
  clearInterval(timeInterval);
  const recordTime = localStorage.getItem("record");
  if (recordTime) {
    timePlaying = formatTime(Date.now() - timeStart);
    if (recordTime > timePlaying) {
      localStorage.setItem("record", timePlaying);
    } else {
      pResultado.innerHTML = "Manco intenta superar el record";
    }
  } else {
    localStorage.setItem("record", timePlaying);
  }
}
function showLives() {
  spanLives.innerHTML = emojis["HEART"].repeat(lives);
}
function showTime() {
  spanTime.innerHTML = formatTime(Date.now() - timeStart);
}

function showRecords() {
  spanRecords.innerHTML = localStorage.getItem("record");
}
function formatTime(ms) {
  const cs = parseInt(ms / 10) % 100;
  const seg = parseInt(ms / 1000) % 60;
  const min = parseInt(ms / 60000) % 60;
  const csStr = `${cs}`.padStart(2, "0");
  const segStr = `${seg}`.padStart(2, "0");
  const minStr = `${min}`.padStart(2, "0");
  return `${minStr}:${segStr}:${csStr}`;
}
window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnRight.addEventListener("click", moveRight);
btnLeft.addEventListener("click", moveLeft);

function moveByKeys(event) {
  let key = event.key;
  switch (key) {
    case "ArrowUp":
      moveUp();
      break;

    case "ArrowDown":
      moveDown();
      break;

    case "ArrowRight":
      moveRight();
      break;

    case "ArrowLeft":
      moveLeft();
      break;

    default:
      break;
  }
}

function moveUp() {
  if (playerPosition.y - elementSize <= 0) {
    console.log("No puedes ir fuera del mapa");
  } else {
    playerPosition.y -= elementSize;
    /*  clearMap(); */
    startGame();
    /*   movePlayer(); */
  }
}

function moveDown() {
  if (playerPosition.y + elementSize >= canvasSize + 14) {
    console.log("No te puedes salir del mapa");
  } else {
    playerPosition.y += elementSize;
    startGame();
  }
}
function moveRight() {
  if (playerPosition.x + elementSize >= canvasSize + 14) {
    console.log("No te puedes salir del mapa");
  } else {
    playerPosition.x += elementSize;
    startGame();
  }
}

function moveLeft() {
  if (playerPosition.x - elementSize < elementSize) {
    console.log("No te puedes salir del mapa");
  } else {
    playerPosition.x -= elementSize;
    startGame();
  }
}
