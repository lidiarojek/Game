const square = document.querySelector('.square');
const container = document.querySelector('.container');



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
    const squareSide = square.offsetHeight;
    const height = container.clientHeight;
    const width = container.clientWidth;
    const top = getRandom(squareSide, height);
    const right = getRandom(squareSide, width);
    square.style.top = `${top-squareSide}px`; 
    square.style.right = `${right-squareSide}px`;
}

function getRandom(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}
