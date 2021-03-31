const square = document.querySelector('.square');


const interval = setInterval(() => {
    const top = Math.floor((Math.random() * 100) + 1);
    const right = Math.floor((Math.random() * 100) + 1);
    square.style.top = top + "%";
    square.style.right = right + "%";
    console.log(top, right);
}, 1000);


setTimeout(() => {
    clearInterval(interval);
}, 10000);