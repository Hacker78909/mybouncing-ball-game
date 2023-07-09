window.onload = function() {
  // Get the canvas element and create a 2D drawing context
  var canvas = document.getElementById("gameCanvas");
  var context = canvas.getContext("2d");

  // Game variables
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

  // Initialize the game
  function initGame() {
    // Set up the canvas and game objects
    random = new Random();
    ballX = random.nextInt(canvas.width - 20);
    ballY = random.nextInt(canvas.height - 20);

    // Create a restart button and hide it initially
    restartButton = document.createElement("button");
    restartButton.innerHTML = "Restart";
    restartButton.style.position = "absolute";
    restartButton.style.left = "200px";
    restartButton.style.top = "225px";
    restartButton.style.width = "100px";
    restartButton.style.height = "50px";
    restartButton.style.display = "none";
    restartButton.addEventListener("click", restartGame);
    document.body.appendChild(restartButton);

    // Start the game loop
    timer = setInterval(updateGame, 10);
  }

  // Update the game state
  function updateGame() {
    moveBall();

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, 2 * Math.PI);
    context.fill();

    // Draw the paddle
    context.fillStyle = "red";
    context.fillRect(paddleX, paddleY, 80, 10);

    // Draw the score
    context.fillStyle = "black";
    context.font = "16px Arial";
    context.fillText("Score: " + score, 10, 20);
    context.fillText("Highest Score: " + highestScore, 10, 40);

    // Check if the game is over
    if (gameOver) {
      // Stop the game loop
      clearInterval(timer);

      // Display game over message and show the restart button
      context.fillStyle = "black";
      context.font = "20px Arial";
      context.fillText("Game Over", 200, 200);
      restartButton.style.display = "block";
    }
  }

  // Move the ball and handle collisions
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

  // Restart the game
  function restartGame() {
    gameOver = false;
    restartButton.style.display = "none";
    ballX = random.nextInt(canvas.width - 20);
    ballY = random.nextInt(canvas.height - 20);
    ballXSpeed = 1;
    ballYSpeed = 1;
    score = 0;
    timer = setInterval(updateGame, 10);
  }

  // Handle key press events
  document.addEventListener("keydown", function(event) {
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
  });

  // Start the game
  initGame();
};
