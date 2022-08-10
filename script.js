
document.getElementById("reset").addEventListener("click", (event) => {
    event.preventDefault();
    clearBoard();
    shuffle();
    clearInterval(timer);
})