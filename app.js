const createGame = () => {

    let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let currentTurn = 'X';
    let winner = false;


    const checkFullBoard = () => {
        let fullBoard = true;
        board.forEach(element => {
            if (element !== 'X' && element !== 'O') {
                fullBoard = false;
            }
        });
        return fullBoard;
    }

    const getCurrentTurn = () =>  currentTurn;

    const setTurn = () => {
        if (currentTurn === 'X') {
            currentTurn = 'O';
        } else {
            currentTurn = 'X';
        }
    }


    const displayBoard = () => {
        console.log(board[0] + '|' + board[1] + '|' + board[2]);
        console.log('-----');
        console.log(board[3] + '|' + board[4] + '|' + board[5]);
        console.log('-----');
        console.log(board[6] + '|' + board[7] + '|' + board[8]);
        }

    const getBoard = () => {
        return board;
    }

    const checkWin = () => {
        if (board[0] === board[1] && board[1] === board[2]) {
            winner = true;
            return true;
        } else if (board[3] === board[4] && board[4] === board[5]) {
            winner = true;
            return true;
        } else if (board[6] === board[7] && board[7] === board[8]) {
            winner = true;
            return true;
        } else if (board[0] === board[3] && board[3] === board[6]) {
            winner = true;
            return true;
        } else if (board[1] === board[4] && board[4] === board[7]) {
            winner = true;
            return true;
        } else if (board[2] === board[5] && board[5] === board[8]) {
            winner = true;
            return true;
        } else if (board[0] === board[4] && board[4] === board[8]) {
            winner = true;
            return true;
        } else if (board[2] === board[4] && board[4] === board[6]) {
            winner = true;
            return true;
        } else {
            winner = false;
            return false;
        }
    }


    const takeTurn = (position) => {
        
        if (board[position] === 'X' || board[position] === 'O') {
            console.log('Invalid move!');
            return 401;
        } 
        else if (winner) {
            return winner;
        }
        else {
            board[position] = currentTurn;
            if (checkFullBoard()) {
                console.log('Tie game!');
                return 500;
            }
            displayBoard();
            if (checkWin()){
                return winner;      //return early so currentTurn doesn't change
            }
            setTurn();
            return winner;
        }
    }
return { takeTurn, displayBoard, getBoard, getCurrentTurn };
}




const screenController = () => {
    
    const boardDiv = document.querySelector('.board');
    const game = createGame();
    const board = game.getBoard();
    const xTurn = document.querySelector('.x-turn');
    xTurn.style.display = 'none';
    const oTurn = document.querySelector('.o-turn');
    oTurn.style.display = 'none';
    (game.getCurrentTurn() === 'X' ?xTurn.style.display = 'block': oTurn.style.display = 'block');


    board.forEach((element, index) => {
        const square = document.createElement('button');
        square.classList.add('square');
        square.setAttribute('data-index', index);
        square.textContent = '';
        boardDiv.appendChild(square);
    });

    const clickHandler = (event) => {
        
        const index = event.target.getAttribute('data-index');
        let currentTurn = game.getCurrentTurn();
        let result = game.takeTurn(index);

        if (result !== 401) {// 401 is the error code for invalid move
            let selectedSquare = document.querySelector(`[data-index='${index}']`);
            selectedSquare.textContent = currentTurn;
            if (game.getCurrentTurn() === 'X') {
                xTurn.style.display = 'block';
                oTurn.style.display = 'none';
            }
            else {
                xTurn.style.display = 'none';
                oTurn.style.display = 'block';
            }
            
        }
        if (result === 500) { // 500 is the code for a tie
            const message = document.querySelector('.message');
            message.textContent = 'Tie game!';
            const modal = document.querySelector('.modal');
            modal.style.display = 'block';
        }
        
        if (result === true) { // true is the code for a win
            const squares = document.querySelectorAll('.square');
            squares.forEach(square => {
                square.removeEventListener('click', clickHandler);
            });
            const message = document.querySelector('.message');
            message.textContent = `Player ${game.getCurrentTurn()} wins!`;

            const modal = document.querySelector('.modal');
            modal.style.display = 'block';
        }
        
    }

    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('click', clickHandler);
    });
    
}


screenController();





const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', () => {
    const boardDiv = document.querySelector('.board');
    boardDiv.textContent = '';
    screenController();
    const message = document.querySelector('.message');
    message.textContent = '';
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
});