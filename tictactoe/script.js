const TicTac = {
    cPlayer: "x", 
    state: Array(9).fill(null), 
    gameOver: false, 

    init() {
        this.cBoard();
        document
            .getElementById("reset")
            .addEventListener("click", () => this.reset());
    },

    cBoard() {
        const board = document.getElementById("board");
        board.innerHTML = ""; 
        this.state.forEach((_, i) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            board.appendChild(cell);
        });
        board.addEventListener("click", (e) => this.handleClick(e)); 
        this.uMessage(`Player ${this.cPlayer}'s turn`);
    },

    handleClick(e) {
        const cell = e.target;
        const i = cell.dataset.index;

        if (this.gameOver || !cell.classList.contains("cell") || this.state[i])
            return;

        this.state[i] = this.cPlayer;
        cell.textContent = this.cPlayer;
        cell.classList.add("taken");

        const winCombo = this.checkWin();
        if (winCombo) {
            this.highlight(winCombo);
            this.uMessage(`Player ${this.cPlayer} wins!`);
            this.gameOver = true;
        } else if (this.state.every((cell) => cell)) {
            this.uMessage("It's a tie!");
            this.gameOver = true;
        } else {
            this.cPlayer = this.cPlayer === "x" ? "o" : "x";
            this.uMessage(`Player ${this.cPlayer}'s turn`);
        }
    },

    checkWin() {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], 
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], 
            [0, 4, 8],
            [2, 4, 6], 
        ];
        return wins.find((combo) =>
            combo.every((i) => this.state[i] === this.cPlayer)
        );
    },

    highlight(combo) {
        combo.forEach((i) => {
            document.getElementById("board").children[i].style.background = "#45a049";
        });
        this.showModal(`Player ${this.cPlayer} wins!`);
    },
    
    showModal(message) {
        const modal = document.getElementById("gameOverModal");
        const modalMessage = document.getElementById("modalMessage");
        modalMessage.textContent = message;
        modal.style.display = "flex";
    
        document.getElementById("resetButton").addEventListener("click", () => {
            this.reset();
            modal.style.display = "none";
        });
    },
    
    reset() {
        this.state = Array(9).fill(null);
        this.cPlayer = "x";
        this.gameOver = false;
        this.cBoard();
        const modal = document.getElementById("gameOverModal");
        modal.style.display = "none"; 
    },
    
    uMessage(msg) {
        document.getElementById("message").textContent = msg;
    },
};

TicTac.init();