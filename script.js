let player1Name = "";
let player1Password = "";
let player2Name = "";
let player2Password = "";

let player1Score = 0;  // Player 1's score
let player2Score = 0;  // Player 2's score

function submitDetails() {
    player1Name = document.getElementById('player1Name').value;
    player1Password = document.getElementById('player1Password').value;
    player2Name = document.getElementById('player2Name').value;
    player2Password = document.getElementById('player2Password').value;

    if (player1Name.trim() === "" || player1Password.trim() === "" || player2Name.trim() === "" || player2Password.trim() === "") {
        alert("Please enter both Name and Password for both players.");
        return;
    }

    document.getElementById('loginPopup').style.display = "none"; // Hide popup
}

console.log("Welcome to Tic Tac Toe")
const music = new Audio("C:\\Users\\user\\Downloads\\button-202966.mp3")
let audioturn = new Audio("C:\\Users\\user\\Downloads\\gun-chamber-round-96258.mp3")
let gameover = new Audio("C:\\Users\\user\\Downloads\\game-over-arcade-6435.mp3")
let turn = "X"
let isgameover = false;
const changeturn = () => {
    return turn === "X" ? "0" : "X"
}

const checkwin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[0]].innerText !== "")) {
            
            let winner = boxtext[e[0]].innerText;  // Get winner (X or O)
            document.querySelector('.info').innerText = winner + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '300px';
            document.querySelector(".line").style.width = "20vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            gameover.play();

            // Update the score for the winner
            if (winner === "X") {
                player1Score += 1;  // Increment Player 1's score
                savePlayerScore(player1Name, player1Password, player1Score);
            } else {
                player2Score += 1;  // Increment Player 2's score
                savePlayerScore(player2Name, player2Password, player2Score);
            }
        }
    });
}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeturn();
            audioturn.play();
            checkwin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "turn for " + turn;
            }
        }
    });
})

reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0px';
})

function savePlayerScore(name, password, score) {
    fetch('http://localhost:3000/save-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, score })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log the response from server
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
