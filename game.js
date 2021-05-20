const square = document.querySelector('.square');
const container = document.querySelector('.container');
const minDistance = 20;


let counter = 0;


const onSquareClick = (event) => {
    event.target.querySelector(".count").innerText = ++counter;

    moveSquareAfterTimeout();
}

square.addEventListener("click", onSquareClick);

let timeout;

const moveSquareAfterTimeout = () => {

    if (timeout) {
        clearTimeout(timeout);
    }

    setRandomSquarePosition(container, square);
    timeout = setTimeout(() => {
        moveSquareAfterTimeout()
    }, 1000);
}

moveSquareAfterTimeout();

function setRandomSquarePosition(container, square) {
    const containerRect = container.getBoundingClientRect();
    const elemRect = square.getBoundingClientRect();
    const offsetTop = elemRect.top - containerRect.top;
    const offsetRight = containerRect.right - elemRect.right;
    const squareSide = square.offsetHeight;
    const height = container.clientHeight;
    const width = container.clientWidth;
    const topNext = getRandom(squareSide, height) - squareSide;
    const rightNext = getRandom(squareSide, width) - squareSide;

    if (Math.abs(offsetTop - topNext) < minDistance || Math.abs(offsetRight - rightNext) < minDistance) {
        setRandomSquarePosition(container, square);
        return;
    } else {
        square.style.top = `${topNext}px`;
        square.style.right = `${rightNext}px`;
    }

}

function getRandom(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}