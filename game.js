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

    setSquarePosition({top, left, square})

    timeout = setTimeout(() => {
        moveSquareAfterTimeout()
    }, 200);
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
