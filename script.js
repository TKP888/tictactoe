const gameboard = (() =>{
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
    }

    return {
        render,
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
    }

    return {
        start,
    }
})();



const startButton = document.querySelector("#start");
startButton.addEventListener("click", ()=>{
    game.start();

});


const restartButton = document.querySelector("#restart")
restartButton.addEventListener("click", ()=>{
    alert("hi");
    
});