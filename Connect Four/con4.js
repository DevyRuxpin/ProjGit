class Connect4 {
    constructor() {
        this.rows = 6; // Assuming 6 rows
        this.columns = 7; // Assuming 7 columns
        this.currentPlayer = 1; // Player 1 starts
        this.board = this.createBoard(); // Initialize the board
    }

    createBoard() {
        let board = [];
        for (let row = 0; row < this.rows; row++) {
            board[row] = [];
            for (let col = 0; col < this.columns; col++) {
                board[row][col] = 0; // 0 indicates an empty cell
            }
        }
        return board;
    }

    renderBoard() {
        const gameBoard = document.getElementById('gameBoard');
        if (!gameBoard) return; 
        gameBoard.innerHTML = ''; 
        for (let row = 0; row < this.rows; row++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'row';
            for (let col = 0; col < this.columns; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.addEventListener('click', () => this.placePiece(col));
                if (this.board[row][col] === 1) {
                    cell.classList.add('occupied', 'player1');
                } else if (this.board[row][col] === 2) {
                    cell.classList.add('occupied', 'player2');
                }
                rowElement.appendChild(cell);
            }
            gameBoard.appendChild(rowElement);
        }
    }

    placePiece(col) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.board[row][col] === 0) {
                this.board[row][col] = this.currentPlayer;
                this.switchPlayer();
                this.renderBoard();
                if (this.checkVictory(row, col)) {
                    alert(`Player ${this.currentPlayer === 1 ? 2 : 1} wins!`);
                    this.resetGame();
                }
                return;
            }
        }
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    checkVictory(row, col) {
        const player = this.board[row][col];
        if (player === 0) return false; 

        const checkDirection = (deltaRow, deltaCol) => {
            let count = 1;
            let r = row + deltaRow, c = col + deltaCol;
            while (r >= 0 && r < this.rows && c >= 0 && c < this.columns && this.board[r][c] === player) {
                count++;
                r += deltaRow;
                c += deltaCol;
            }
           
            r = row - deltaRow;
            c = col - deltaCol;
            while (r >= 0 && r < this.rows && c >= 0 && c < this.columns && this.board[r][c] === player) {
                count++;
                r -= deltaRow;
                c -= deltaCol;
            }
            return count >= 4; // True if 4 or more in a row
        };
    
        // Check all directions
        return checkDirection(0, 1) || // Horizontal
               checkDirection(1, 0) || // Vertical
               checkDirection(1, 1) || // Descending Diagonal
               checkDirection(1, -1);  // Ascending Diagonal
    }

    resetGame() {
        this.board = this.createBoard(); // Reset the board
        this.currentPlayer = 1; // Reset to player 1
        this.renderBoard(); // Re-render the board for the new game
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Connect4();
    game.renderBoard();
});