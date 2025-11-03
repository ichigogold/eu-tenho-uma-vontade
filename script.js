const startBtn = document.getElementById("startBtn");
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const flash = document.getElementById("flash");
const mob = document.getElementById("mob");
const gameOverText = document.getElementById("gameover");
const startImage = document.getElementById("startImage");

let currentRoom = "";    
let visitedRoom = false;   
let mobRoom = "";
let mobVisible = false;
let reacting = false;
let gameOver = false;

const roomBackgrounds = {
  esquerda: "janela.jpg",
  meio: "porta2.jpeg",
  direita: "q.jpg"
};

startBtn.onclick = () => {
  menu.style.display = "none";
  game.style.display = "block";

  startImage.style.display = "block";
  setTimeout(() => startImage.style.opacity = 1, 50);

  setTimeout(() => {
    startImage.style.opacity = 0;
    setTimeout(() => {
      startImage.style.display = "none";
      game.style.background = "url('base.jpeg') center/cover no-repeat";

      spawnMob();
      gameLoop();
    }, 1000);
  }, 2000);
};

function changeRoom(room) {
  if (gameOver) return;
  currentRoom = room;
  visitedRoom = true; 
  game.style.background = `url('${roomBackgrounds[room]}') center/cover no-repeat`;
}

function spawnMob() {
  if (gameOver) return;

  const rooms = ["esquerda", "meio", "direita"];
  mobRoom = rooms[Math.floor(Math.random() * 3)];
  mobVisible = true;
  mob.style.display = "block";
  mob.style.opacity = mobRoom === currentRoom ? 1 : 0;

  reacting = true;

  setTimeout(() => {
    if (reacting && mobRoom === currentRoom) triggerGameOver();
  }, 2000 + Math.random() * 1000);

  setTimeout(() => {
    if (!gameOver) {
      mobVisible = false;
      mob.style.display = "none";
      reacting = false;
      setTimeout(spawnMob, 4000 + Math.random() * 3000);
    }
  }, 3000);
}

function usarFlash() {
  if (gameOver) return;

  flash.style.transition = "none";
  flash.style.opacity = 1;
  setTimeout(() => {
    flash.style.transition = "opacity 0.3s ease";
    flash.style.opacity = 0;
  }, 50);

  if (mobVisible && currentRoom === mobRoom) {
    mobVisible = false;
    mob.style.display = "none";
    reacting = false;
    setTimeout(spawnMob, 4000 + Math.random() * 2000);
  }
}

function triggerGameOver() {
  gameOver = true;
  mob.style.display = "block";
  mob.style.width = "100%";
  mob.style.height = "100%";
  mob.style.left = "0";
  mob.style.background = "url('medo.jpg') center/contain no-repeat";
  mob.style.backgroundColor = "white";
  gameOverText.style.display = "flex";
}

function gameLoop() {
  if (gameOver) return;
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (gameOver) return;
  const key = e.key.toLowerCase();

  switch(key) {
    case "v":
      if (!visitedRoom && currentRoom === "") changeRoom("esquerda");
      break;
    case "b":
      if (!visitedRoom && currentRoom === "") changeRoom("meio");
      break;
    case "c":
      if (!visitedRoom && currentRoom === "") changeRoom("direita");
      break;
    case "z":
      if (visitedRoom) usarFlash();
      break;
    case "x":
      if (visitedRoom) {
        currentRoom = "";
        visitedRoom = false;
        game.style.background = "url('base.jpeg') center/cover no-repeat";
        mob.style.display = "none";
        reacting = false;
      }
      break;
  }
});
