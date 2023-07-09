window.onload = function () {
  // BouncingBallGame class
  function BouncingBallGame() {
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");

    var paddleX = 200;
    var paddleY = 450;
    var ballX;
    var ballY;
    var ballXSpeed = 1;
    var ballYSpeed = 1;
    var score = 0;
    var highestScore = 0;
    var gameOver = false;
    var restartButton;
    var timer;
    var random;

    function init() {
      canvas.addEventListener("keydown", keyPressed);
      canvas.addEventListener("keyup", keyReleased);
      restartButton = document.createElement("button");
      restartButton.innerHTML = "Restart";
      restartButton.style.position = "absolute";
      restartButton.style.left = "200px";
      restartButton.style.top = "225px";
      restartButton.style.width = "100px";
      restartButton.style.height = "50px";
      restartButton.style.visibility = "hidden";
      restartButton.addEventListener("click", restartGame);
      document.body.appendChild(restartButton);

      random = new Random();
      ballX = random.nextInt(canvas.width - 20);
      ballY = random.nextInt(canvas.height - 20);

      timer = setInterval(update, 10);
    }

    function update() {
      moveBall();

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "blue";
      context.beginPath();
      context.arc(ballX, ballY, 10, 0, Math.PI * 2);
      context.closePath();
      context.fill();

      context.fillStyle = "red";
      context.fillRect(paddleX, paddleY, 80, 10);

      context.fillStyle = "black";
      context.font = "16px Arial";
      context.fillText("Score: " + score, 10, 20);
      context.fillText("Highest Score: " + highestScore, 10, 40);

      if (gameOver) {
        context.fillStyle = "black";
        context.font = "20px Arial";
        context.fillText("Game Over", 200, 200);
        clearInterval(timer);
        restartButton.style.visibility = "visible";
      }
    }

    function moveBall() {
      ballX += ballXSpeed;
      ballY += ballYSpeed;

      if (ballX <= 0 || ballX >= canvas.width - 20) {
        ballXSpeed = -ballXSpeed;
      }
      if (ballY <= 0 || ballY >= canvas.height - 20) {
        ballYSpeed = -ballYSpeed;
      }

      if (
        ballX < paddleX + 80 &&
        ballX + 20 > paddleX &&
        ballY < paddleY + 10 &&
        ballY + 20 > paddleY
      ) {
        ballYSpeed = -ballYSpeed;
        score++;
      } else if (ballY >= canvas.height - 20) {
        gameOver = true;
      }
    }

    function restartGame() {
      gameOver = false;
      restartButton.style.visibility = "hidden";
      ballX = random.nextInt(canvas.width - 20);
      ballY = random.nextInt(canvas.height - 20);
      ballXSpeed = 1;
      ballYSpeed = 1;
      score = 0;
      timer = setInterval(update, 10);
    }

    function keyPressed(event) {
      if (event.keyCode === 37) {
        // Left arrow key
        paddleX -= 10;
      } else if (event.keyCode === 39) {
        // Right arrow key
        paddleX += 10;
      }

      if (paddleX < 0) {
        paddleX = 0;
      } else if (paddleX > canvas.width - 80) {
        paddleX = canvas.width - 80;
      }
    }

    function keyReleased(event) {}

    init();
  }

  new BouncingBallGame();
};
