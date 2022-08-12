

function showWinScreen() {
    const modalClose = document.querySelector(".close");
    modal.style.display = "flex";
    
    modalClose.onclick = function () { 
        modal.style.display = "none";
    };
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function toWinGame() {
    if (matched.length === 16) {
        showWinScreen()
        //stop timer
    }
}

playAgain.addEventListener('click', function() {
    modal.style.display = "none";
    //reset function
});