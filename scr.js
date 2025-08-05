let playerScore = 0;
let computerScore = 0;
let isPlayerTurn;
let targetScore = 0;

const params = new URLSearchParams(window.location.search);
const choice = params.get('choice');

if (choice === 'bat') {
    isPlayerTurn = true;
}
if (choice === 'bowl') {
    isPlayerTurn = false;
}

const playerButtons = document.querySelectorAll('.options button');
const playerImage = document.getElementById('left-image');
const computerImage = document.getElementById('right-image');
const playerScoreInput = document.getElementById('score-comp');
const computerScoreInput = document.getElementById('score-player');
const resultDisplay = document.getElementById('result');

playerButtons.forEach(button => {
  button.addEventListener('click', () => {
    const chosen = parseInt(button.value);

    if (isPlayerTurn) {
      const compBall = Math.floor(Math.random() * 7);

      playerImage.src = button.getAttribute('data-image');
      computerImage.src = `num${compBall}.jpg`;

      if (chosen === compBall) {
        if (targetScore > 0 && playerScore < targetScore) {
          if (playerScore === targetScore - 1) {
            Swal.fire({
              title: "It's a Tie!",
              text: `Both scored ${playerScore}.`,
              imageUrl: "win.jpg",
              imageWidth: 200,
              imageHeight: 200,
              confirmButtonText: 'play again',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "choose.html";
              }
            });
            resultDisplay.textContent = "It's a Tie!";
          } else {
            Swal.fire({
              title: "Computer Wins!",
              text: `You are OUT! You scored ${playerScore}.`,
              imageUrl: "out.jpg",
              imageWidth: 200,
              imageHeight: 200,
              confirmButtonText: 'play again',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "choose.html";
              }
            });
            resultDisplay.textContent = "Computer Wins!";
          }
        } else {
          Swal.fire({
            text: `You are OUT! Computer also played ${compBall}`,
            title: "DEFEND THE TARGET",
            imageUrl: "out.jpg",
            imageWidth: 200,
            imageHeight: 200,
          }).then(() => {
            isPlayerTurn = false;
            targetScore = playerScore + 1;
            resultDisplay.textContent = `Target for computer: ${targetScore}`;
            computerScore = 0;
            computerScoreInput.value = 0;
          });
        }
      } else {
        playerScore += chosen;
        playerScoreInput.value = playerScore;

        if (targetScore > 0 && playerScore >= targetScore) {
          Swal.fire({
            title: "You Win!",
            text: `You chased the target!`,
            imageUrl: "win.jpg",
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonText: 'play again',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "choose.html";
            }
          });
          resultDisplay.textContent = "You Win!";
        }
      }

    } else {
      const compBat = Math.floor(Math.random() * 7);
      const compBowl = chosen;

      playerImage.src = `num${compBowl}.jpg`;
      computerImage.src = `num${compBat}.jpg`;

      if (targetScore === 0) {
        if (compBat === compBowl) {
          Swal.fire({
            title: "Computer is OUT!",
            text: `Final score ${computerScore}. Your turn to chase!`,
            imageUrl: "out.jpg",
            imageWidth: 200,
            imageHeight: 200,
          }).then(() => {
            isPlayerTurn = true;
            targetScore = computerScore + 1;
            resultDisplay.textContent = `Target for you: ${targetScore}`;
            playerScore = 0;
            playerScoreInput.value = 0;
            computerScoreInput.value = computerScore;
          });
        } else {
          computerScore += compBat;
          computerScoreInput.value = computerScore;
        }
      } else {
        if (compBat === compBowl) {
          if (computerScore < targetScore) {
            if (computerScore === targetScore - 1) {
              Swal.fire({
                title: "It's a Tie!",
                text: `Both scored ${computerScore}.`,
                imageUrl: "tie.jpg",
                imageWidth: 200,
                imageHeight: 200,
                confirmButtonText: 'play again',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "choose.html";
                }
              });
              resultDisplay.textContent = "It's a Tie!";
            } else {
              Swal.fire({
                title: "You Win!",
                text: `Computer is OUT! Final score ${computerScore}. You defended the target!`,
                imageUrl: "win.jpg",
                imageWidth: 200,
                imageHeight: 200,
                confirmButtonText: 'play again',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "choose.html";
                }
              });
              resultDisplay.textContent = "You Win!";
            }
          } else {
            Swal.fire({
              title: "Computer Wins!",
              text: `Computer chased the target!`,
              imageUrl: "out.jpg",
              imageWidth: 200,
              imageHeight: 200,
              confirmButtonText: 'play again',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "choose.html";
              }
            });
            resultDisplay.textContent = "Computer Wins!";
          }
        } else {
          computerScore += compBat;
          computerScoreInput.value = computerScore;
          if (computerScore >= targetScore) {
            Swal.fire({
              title: "Computer Wins!",
              text: `Computer chased the target!`,
              imageUrl: "out.jpg",
              imageWidth: 200,
              imageHeight: 200,
              confirmButtonText: 'play again',
            })  .then((result) => {
              if (result.isConfirmed) {
                window.location.href = "choose.html";
              }
            });
            resultDisplay.textContent = "Computer Wins!";
          }
        }
      }
    }
  });
});
