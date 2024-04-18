const displayMessage = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    };

    return {
        renderMessage
    };
})();



const gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", game.handleClick);
            })
   
    }

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    };


    const getGameboard = () => gameboard; 

    return {
        render,
        update,
        getGameboard
    }
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}


const game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver = false;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#p1").value, "X"),
            createPlayer(document.querySelector("#p2").value, "O")
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        gameboard.render();
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", handleClick);
            })
    }

    const handleClick = (event) => {
if (gameOver){
return;
}
    
        let index = parseInt(event.target.id.split("-")[1]);
        if (gameboard.getGameboard()[index] !== "")
        return;


        gameboard.update(index, players[currentPlayerIndex].mark);
          
    if (checkWin(gameboard.getGameboard(), players[currentPlayerIndex].mark)){
        gameOver = true;
       displayMessage.renderMessage(`${players[currentPlayerIndex].name} won!`)
    } else if (checkTie(gameboard.getGameboard())){
        gameOver = true;
        displayMessage.renderMessage(`It's a draw!`);
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            gameboard.update(i,"");
        }
        gameboard.render();
        gameOver = false;
        document.querySelector("#message").innerHTML = "";
    }


    return {
        start,
        restart,
        handleClick,
        checkWin,
        checkTie
    }
})();

function checkWin(board) {
    const winCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winCombo.length; i++) {
        const [a, b, c] = winCombo[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            return true;
        }
    }
    return false; 
}


function checkTie(board) {
    return board.every(cell => cell !== "");

}

const startButton = document.querySelector("#start");
startButton.addEventListener("click", ()=>{
    game.start();

});


const restartButton = document.querySelector("#restart")
restartButton.addEventListener("click", ()=>{
   game.restart();
    
});