var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var blockSize = 20;
var widthInBlocks = canvas.width / blockSize;
var heightInBlocks = canvas.height / blockSize;

var score = 0;

var snake = [];
snake[0] = {
  x: Math.floor(widthInBlocks / 2),
  y: Math.floor(heightInBlocks / 2)
};

var direction = "right";
var apple = {
  x: Math.floor(Math.random() * widthInBlocks),
  y: Math.floor(Math.random() * heightInBlocks)
};

function drawBlock(x, y) {
  var offsetX = x * blockSize;
  var offsetY = y * blockSize;
  ctx.fillRect(offsetX, offsetY, blockSize, blockSize);
}

function drawSnake() {
  ctx.fillStyle = "#333";
  for (var i = 0; i < snake.length; i++) {
    var block = snake[i];
    drawBlock(block.x, block.y);
  }
}

function drawApple() {
  ctx.fillStyle = "#ff0000";
  drawBlock(apple.x, apple.y);
}

function checkCollision(x, y, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].x === x && array[i].y === y) {
      return true;
    }
  }
  return false;
}

function updateScore() {
  ctx.fillStyle = "#666";
  ctx.font = "20px Arial";
  ctx.fillText("Счет: " + score, blockSize, blockSize);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSnake();
  drawApple();
  updateScore();

  var snakeX = snake[0].x;
  var snakeY = snake[0].y;

  if (direction === "right") snakeX++;
  else if (direction === "left") snakeX--;
  else if (direction === "up") snakeY--;
  else if (direction === "down") snakeY++;

  if (snakeX === apple.x && snakeY === apple.y) {
    score++;
    if (score === 30) {
                                                                                                                                                                                                         setMessage("Поздравляю! Ты выиграл! Use: /zmeika/congratulation");
      return;
    }
    apple = {
      x: Math.floor(Math.random() * widthInBlocks),
      y: Math.floor(Math.random() * heightInBlocks)
    };
  } else {
    snake.pop();
  }

  var newHead = {
    x: snakeX,
    y: snakeY
  };

  if (
    snakeX < 0 ||
    snakeX >= widthInBlocks ||
    snakeY < 0 ||
    snakeY >= heightInBlocks ||
    checkCollision(snakeX, snakeY, snake)
  ) {
    setMessage("Игра окончена. Попробуй снова!");
    setTimeout(resetGame, 1000);
    return;
  }

  snake.unshift(newHead);

  setTimeout(draw, 100);
}

function setMessage(msg) {
  var message = document.getElementById("message");
  message.textContent = msg;
}

function resetGame() {
  snake = [];
  snake[0] = {
    x: Math.floor(widthInBlocks / 2),
    y: Math.floor(heightInBlocks / 2)
  };
  direction = "right";
  score = 0;
  setMessage("");
  draw();
}

document.addEventListener("keydown", function(event) {
  var key = event.keyCode;
  if (key === 37 && direction !== "right") direction = "left";
  else if (key === 38 && direction !== "down") direction = "up";
  else if (key === 39 && direction !== "left") direction = "right";
  else if (key === 40 && direction !== "up") direction = "down";
});

resetGame();