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
        let index = parseInt(event.target.className.split(' ')[1]);
        if (gameBoard.getGameboard()[index] !== '')
            return
        
        gameBoard.update(index, players[currentPlayerIndex].token)
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0 ;
        
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
        // Clear the game board array
        gameBoard.getGameboard().fill('');
        
        // Clear the display of the game board
        let grid = document.querySelector('.container');
        grid.innerHTML = '';
    
        // Reinitialize the game
        gameStart();
    }
    return {gameStart,handleclick,restartGame}


})();

const startbutton = document.querySelector('.playgame-btn');
startbutton.addEventListener('click', ()=>{
    playgame.gameStart();
    
});

const restartbutton = document.querySelector('.restart-btn');
restartbutton.addEventListener('click', ()=> {
    playgame.restartGame();
})