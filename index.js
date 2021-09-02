const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");
const $buttonStart = document.querySelector("#start");
const $buttonPause = document.querySelector("#pause");
let gameInterval;

//clases del Juego
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
    this.speed = 6;
    this.img = new Image();
    this.img.src = "./images/cow.png";
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
}

//Intancias
const cow = new Character(0, 250);
const board = new Board();

//Motor del juego

function updateGame() {
  //recalcular el estado de los elementos

  //limpiar el canvas
  clearCanvas();
  //dibujar los elementos

  board.draw();
  cow.draw();
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
