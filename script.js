
document.getElementById("reset").addEventListener("click", (event) => {
    event.preventDefault();
    clearBoard();
    shuffle();
    clearInterval(timer);
    timeElapsedHour = 0;
    timeElapsedMin = 0;
    timeElapsedsecond = 0;
    document.getElementById("timer").innerText = `${timeElapsedHour}:${timeElapsedMin}:${timeElapsedsecond}`;
})