const gameboard = (() =>{
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
        let index = parseInt(event.target.id.split("-")[1]);
        if (gameboard.getGameboard()[index] !== "")
        return;


        gameboard.update(index, players[currentPlayerIndex].mark);
          
    

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            gameboard.update(i,"");
        }
        gameboard.render();
    }


    return {
        start,
        restart,
        handleClick
    }
})();



const startButton = document.querySelector("#start");
startButton.addEventListener("click", ()=>{
    game.start();

});


const restartButton = document.querySelector("#restart")
restartButton.addEventListener("click", ()=>{
   game.restart();
    
});