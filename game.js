firebase.initializeApp({
    apiKey: "AIzaSyCy48otM_L7syhkwg3hXgVyp830i95P69o",
    authDomain: "game-73643.firebaseapp.com",
    databaseURL: "https://game-73643-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "game-73643",
    storageBucket: "game-73643.appspot.com",
    messagingSenderId: "100100717887",
    appId: "1:100100717887:web:3f973da66b237cf45c678a"
  });


const database = firebase.database();

const minDistance = 200;
let timeout;

const randomGameName = (length = 5) => {

    const array = [];
    const from = 65;
    const to = 90;
    for (let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * (to - from) + from))
    }

    return array.map(code => String.fromCharCode(code)).join("")

}

const gameName = randomGameName();

document.querySelector("#gameName").innerText = gameName;

const gameRef = firebase.database().ref(gameName);

gameRef.set({
    player1: {
        score: 0
    },
    player2: {
        score: 0
    }
})

const setPlayerDisplayScore = (player, data) => document.querySelector(`#${player}`).innerText = data[player].score;

gameRef.on('value', (snapshot) => {
    moveSquareAfterTimeout();
    setPlayerDisplayScore("player1", snapshot.toJSON());
    setPlayerDisplayScore("player2", snapshot.toJSON());
});


let counter = 0;
const updatePlayerResult = async (player) => {

    const data = (await gameRef.get()).toJSON()

    const score = data[player].score + 1;

    await gameRef.update({
        [player]: {
            score
        }
    })


    return score;
}


const onSquareClick = async () => {
    updatePlayerResult("player1");    
}

document.querySelector('.square').addEventListener("click", onSquareClick);



function moveSquareAfterTimeout() {

    if (timeout) {
        clearTimeout(timeout);
    }

    const container = document.querySelector('.container');
    const square = document.querySelector('.square');

    const { top, left } = getNextRandomPosition(container, square);

    setSquarePosition({top, left, square})

    timeout = setTimeout(() => {
        moveSquareAfterTimeout()
    }, 2000);
}

moveSquareAfterTimeout();

function getNextRandomPosition(container, square) {
    
    let left = getRandomWithBindSpot(0, container.scrollWidth, square.offsetLeft - minDistance, square.scrollWidth + square.offsetLeft + minDistance);


    if (left > container.scrollWidth - square.scrollWidth) {
        left = container.scrollWidth - square.scrollWidth;
    }

    if (left < square.scrollWidth) {
        left = square.scrollWidth;
    }


    let top = getRandomWithBindSpot(0, container.scrollHeight, square.offsetTop - minDistance, square.scrollHeight + square.offsetTop + minDistance);


    if (top > container.scrollHeight - square.scrollHeight) {
        top = container.scrollHeight - square.scrollHeight;
    }

    if (top < square.scrollHeight) {
        top = square.scrollHeight;
    }

    return {
        top,
        left,
    }

}

function setSquarePosition({top, left, square}) {
    square.style.top = `${top}px`;
    square.style.left = `${left}px`;
}

function getRandomWithBindSpot(from, to, blindFrom, blindTo) {

    let random = Math.floor(Math.random() * (to - from + 1) + from);

    if (random > blindFrom) {
        random = random + (blindTo - blindFrom);
    }

    if (random > to) {
        return to;
    }

    if (random < from) {
        return from;
    }

    return random;

}


