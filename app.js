const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const resetButton = document.querySelector('.reset');
const winnerMessage = document.querySelector('.winner');
const playAgainButton = document.querySelector('.playAgain');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const index = [...cells].indexOf(cell);

    if (boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    cell.querySelector('.symbol').textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        status.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'} wins!`;
        winnerMessage.classList.remove('hidden');
        playAgainButton.classList.remove('hidden');
        gameActive = false;
    } else if (boardState.every(cell => cell !== '')) {
        status.textContent = "It's a tie!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn (${currentPlayer})`;
    }
}

function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winConditions.some(condition =>
        condition.every(index => boardState[index] === player)
    );
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player 1's turn (X)`;
    winnerMessage.classList.add('hidden');
    playAgainButton.classList.add('hidden');

    cells.forEach(cell => {
        cell.querySelector('.symbol').textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', resetGame);
