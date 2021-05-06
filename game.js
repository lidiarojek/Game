const square = document.querySelector('.square');
const container = document.querySelector('.container');

const interval = setInterval(() => {
    setRandomSquarePosition(container, square);
}, 1000);

function setRandomSquarePosition(container, square) {
    const squareSide = square.offsetHeight;
    const height = container.clientHeight;
    const width = container.clientWidth;
    const top = getRandom(squareSide, height);
    const right = getRandom(squareSide, width);
    square.style.top = `${top-squareSide}px`; 
    square.style.right = `${right-squareSide}px`;
    console.log(top, right);
}

function getRandom(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}
