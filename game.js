const square = document.querySelector('.square');

const interval = setInterval(() => {
    const body = document.body;
    const squareSide = square.offsetHeight;
    const windowWidth = body.clientWidth;
    const windowHeight = body.clientHeight;
    const top = Math.floor((Math.random() * windowHeight) + squareSide);
    const right = Math.floor((Math.random() * windowWidth) + squareSide);
    square.style.top = `calc(${top}px - ${squareSide}px)`;
    square.style.right = `calc(${right}px - ${squareSide}px)`;
    console.log(top, right);
}, 1000);
