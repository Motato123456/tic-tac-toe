
const gameBoard = (function (){
    let board = new Array(9).fill('');
    let displayBoard = function () {
        let grid = document.querySelector('.container');
        for (i=0;i<board.length; i++){
            let square = document.createElement('button');
            square.className = `square ${i}`;
            square.id = i;
            grid.appendChild(square);
            
        }
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', playgame.handleclick);
        });
        
    }
    const update = function(index,token){
        board[index] = token;
        let squares = document.querySelectorAll('.square');
        let selectedSquare = squares[index];
        selectedSquare.textContent = token;
    }
    const getGameboard = () => board;
    return {displayBoard,update, getGameboard}
    
})();

function createPlayer(name, token){
    return {
        name: name,
        token: token,
    }
}

const playgame = (function(){
    let players =[];
    let gameOver;
    let currentPlayerIndex;
    const handleclick = (event) =>{
        if (gameOver){
            return
        }
        let index = parseInt(event.target.className.split(' ')[1]);
        if (gameBoard.getGameboard()[index] !== '')
            return
        
        gameBoard.update(index, players[currentPlayerIndex].token)
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0 ;
        if(checkForWin(gameBoard.getGameboard(),players[currentPlayerIndex].token)){
            gameOver = true;
            alert('playerwon')
        }
        else if(checkForTie(gameBoard.getGameboard())){
            gameOver = true;
            alert('its a tie!')
        }
        
    }
    let gameStart = () => {
        players = [
        createPlayer(document.querySelector('#player-1').value, "X"),
        createPlayer(document.querySelector('#player-2').value, 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        gameBoard.displayBoard();

    }
    const restartGame = () => {
    
        gameBoard.getGameboard().fill('');
        let grid = document.querySelector('.container');
        grid.innerHTML = '';
        gameStart();
    }
    return {gameStart,handleclick,restartGame,}


})();

function checkForWin(board){
    if (board[0] === board[1] && board[0] === board[2] && board[0] !== '') {
        return true;
    }
    if (board[3] === board[4] && board[3] === board[5] && board[3] !== '') {
        return true;
    }
    if (board[6] === board[7] && board[6] === board[8] && board[6] !== '') {
        return true;
    }

    // Check columns
    if (board[0] === board[3] && board[0] === board[6] && board[0] !== '') {
        return true;
    }
    if (board[1] === board[4] && board[1] === board[7] && board[1] !== '') {
        return true;
    }
    if (board[2] === board[5] && board[2] === board[8] && board[2] !== '') {
        return true;
    }

    // Check diagonals
    if (board[0] === board[4] && board[0] === board[8] && board[0] !== '') {
        return true;
    }
    if (board[2] === board[4] && board[2] === board[6] && board[2] !== '') {
        return true;
    }

    return false;
}
function checkForTie (board){
    return board.every(cell => cell != '')
}

const startbutton = document.querySelector('.playgame-btn');
startbutton.addEventListener('click', ()=>{
    playgame.gameStart();
    
});

const restartbutton = document.querySelector('.restart-btn');
restartbutton.addEventListener('click', ()=> {
    playgame.restartGame();
})