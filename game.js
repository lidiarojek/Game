// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCy48otM_L7syhkwg3hXgVyp830i95P69o",
    authDomain: "game-73643.firebaseapp.com",
    databaseURL: "https://game-73643-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "game-73643",
    storageBucket: "game-73643.appspot.com",
    messagingSenderId: "100100717887",
    appId: "1:100100717887:web:3f973da66b237cf45c678a"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

const minDistance = 200;

let counter = 0;
const updatePlayerResult = () => {
    firebase.database().ref("players").push().set({
        "name": player,
        "game": gameName,
        "result": counter,
    });
}
const onSquareClick = (event) => {
    event.target.querySelector(".count").innerText = ++counter;
    updatePlayerResult();
    moveSquareAfterTimeout();
}

document.querySelector('.square').addEventListener("click", onSquareClick);

let timeout;

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

let player = prompt("Type your name");
let gameName = "1st round";

const setPlayer = () => {
   
let players = firebase.database().ref("players").push().set({
    "name": player,
    "game": gameName,
    "result": 5,
});

var newResult = firebase.database().ref().child('results').push().key;

var updates = {};
updates['/results/' + newResult] = players;
return firebase.database().ref().update(updates);
}

setPlayer();

