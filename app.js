const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('turn-text');
const resetBtn = document.getElementById('reset-game');
const playerXDiv = document.querySelector('.player-x');
const playerODiv = document.querySelector('.player-o');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');
const modalOverlay = document.getElementById('result-modal');
const resultMessage = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again');

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let scores = { X: 0, O: 0 };

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resetBtn.addEventListener('click', restartGame);
    playAgainBtn.addEventListener('click', closeAndRestart);
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    running = true;
    updateActivePlayer();
}

function cellClicked(e) {
    const cellIndex = e.target.getAttribute('data-index');

    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    // Tiny pop animation on click
    cell.style.transform = 'scale(0.9)';
    setTimeout(() => {
        cell.style.transform = 'scale(1)';
    }, 100);
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    updateActivePlayer();
}

function updateActivePlayer() {
    if (currentPlayer === "X") {
        playerXDiv.classList.add('active');
        playerODiv.classList.remove('active');
        statusText.style.color = 'var(--color-x)';
    } else {
        playerODiv.classList.add('active');
        playerXDiv.classList.remove('active');
        statusText.style.color = 'var(--color-o)';
    }
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            winningCells = condition;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        statusText.style.color = 'white';
        running = false;
        
        // Highlight winning cells
        winningCells.forEach(index => {
            cells[index].classList.add('winning-cell');
        });

        // Update score
        scores[currentPlayer]++;
        updateScoreDisplay();

        // Show modal after a brief delay
        setTimeout(() => showModal(`Player <span style="color: var(--color-${currentPlayer.toLowerCase()})">${currentPlayer}</span> Wins!`), 600);
    } 
    else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        statusText.style.color = 'white';
        running = false;
        setTimeout(() => showModal(`It's a Draw!`), 600);
    } 
    else {
        changePlayer();
    }
}

function updateScoreDisplay() {
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    statusText.style.color = 'var(--color-x)';
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o', 'winning-cell');
    });
    
    updateActivePlayer();
    running = true;
}

function showModal(message) {
    resultMessage.innerHTML = message;
    modalOverlay.classList.add('show');
}

function closeAndRestart() {
    modalOverlay.classList.remove('show');
    restartGame();
}
