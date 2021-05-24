const minDistance = 200;


let counter = 0;


const onSquareClick = (event) => {
    event.target.querySelector(".count").innerText = ++counter;

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

    setSquarePosition({top, left, container, square})

    timeout = setTimeout(() => {
        moveSquareAfterTimeout()
    }, 200);
}

moveSquareAfterTimeout();

function getNextRandomPosition(container, square) {

    const containerRect = container.getBoundingClientRect();

    const squareRect = square.getBoundingClientRect();

    const { width, height } = containerRect;

    const { left, top } = squareRect;

    const topNext = getRandom(-height/2,  height/2);
    const leftNext = getRandom(-width/2, width/2);

    
    // debugger

    // const elemRect = square.getBoundingClientRect();
    // const offsetTop = elemRect.top - containerRect.top;
    // const offsetRight = containerRect.right - elemRect.right;
    // const squareSide = square.offsetHeight;
    // const height = container.clientHeight;
    // const width = container.clientWidth;
    // const topNext = getRandom(squareSide, height) - squareSide + minDistance;
    // const rightNext = getRandom(squareSide, width) - squareSide + minDistance;


    
    return {
        top: topNext + top + minDistance,
        left: leftNext + left + minDistance
    }

}


function setSquarePosition({top, left, container, square}) {

    const squareRect = square.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const { width: sWidth, height: sHeight } = squareRect;
    const { width: cWidth, height: cHeight } = containerRect;


    let nextTop = top;
    let nextLeft = left;

    if (nextTop < 0) {
        nextTop = 0;
    }

    if (nextTop >= cHeight) {
        nextTop = cHeight - sHeight;
    }

    if (nextLeft < 0) {
        nextLeft = 0;
    }

    if (nextLeft >= cWidth) {
        nextLeft = cWidth - sWidth;
    }


    square.style.top = `${nextTop}px`;
    square.style.left = `${nextLeft}px`;

    

}

function getRandom(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}
