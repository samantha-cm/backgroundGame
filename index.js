const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");
const $buttonStart = document.querySelector("#start");
const $buttonPause = document.querySelector("#pause");
const $buttonRestart = document.querySelector("#restart");
let gameInterval;
let frames = 0;
let obstacles = [];
let isOver = false;

//clases del Juego
const burguerSize = 35;
class Obstacle {
  constructor(x) {
    this.x = x;
    this.y = -burguerSize;
    this.width = burguerSize;
    this.height = burguerSize;
    this.img = new Image();
    this.img.src = "./images/fire.png";
  }
  draw() {
    this.y++;
    //ctx.fillStyle = "black";
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = $canvas.width;
    this.height = $canvas.height;
    this.img = new Image();
    this.img.src = "https://i.ytimg.com/vi/vB4Bz8Evl5A/maxresdefault.jpg";
  }
  draw() {
    if (this.x < -$canvas.width) this.x = 0;
    this.x--;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.img,
      this.x + $canvas.width,
      this.y,
      this.width,
      this.height
    );
  }
}

//Clase del personaje
class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 90;
    this.speed = 10;
    this.img = new Image();
    this.img.src = "./images/Dino.png";
  }
  //Metodos de nuestra clase
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  moveLeft() {
    this.x -= this.speed;
  }
  moveRight() {
    this.x += this.speed;
  }
  moveUp() {
    this.y -= this.speed;
  }
  moveDown() {
    this.y += this.speed;
  }
  isTouching(obstacle) {
    return (
      this.x + this.width > obstacle.x &&
      this.x < obstacle.x + obstacle.width &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
}

//Intancias
const cow = new Character(0, 250);
const board = new Board();

function generateObstacles() {
  // Siempre que frames NO sea multiplo de 100 rompe la ejecucion, limitando la generacion de recursos (en este caso obstaculos)
  if (!(frames % 100 === 0)) return;
  const xRandomPosition = Math.floor(Math.random() * ($canvas.width - 0) + 0);
  const obstacle = new Obstacle(xRandomPosition);
  obstacles.push(obstacle);
}

function printObstacles() {
  for (obstacle of obstacles) {
    obstacle.draw();
  }
}

function checkColitions() {
  for (obstacle of obstacles) {
    if (cow.isTouching(obstacle)) {
      gameOver();
    }
  }
}

function gameOver() {
  console.log("you lost");
  clearInterval(gameInterval);
  isOver = true;
}

function reStart() {
  if (isOver) {
    cow.x = 0;
    cow.y = 150;
    obstacles = [];
    gameInterval = null;
    startGame();
  }
  return (isOver = false);
}

//Motor del juego
function updateGame() {
  //1 y 4. recalcular el estado de los elementos
  frames++;
  generateObstacles();
  checkColitions();
  //2. limpiar el canvas
  clearCanvas();

  //3. dibujar los elementos
  board.draw();
  cow.draw();
  printObstacles();
}

function startGame() {
  if (gameInterval) return;
  gameInterval = setInterval(updateGame, 1000 / 60);
}

//FUNCIONES AUXILIARES

function clearCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}
function pauseGame() {
  clearInterval(gameInterval);
  gameInterval = null;
}

//Eventos del jugador

$buttonStart.addEventListener("click", startGame);
$buttonPause.onclick = pauseGame;
$buttonRestart.addEventListener("click", reStart);

document.onkeydown = (e) => {
  //console.log(e.keyCode);
  switch (e.keyCode) {
    case 37:
      cow.moveLeft();
      break;
    case 39:
      cow.moveRight();
      break;
    case 38:
      cow.moveUp();
      break;
    case 40:
      cow.moveDown();
      break;
    default:
      break;
  }
};
