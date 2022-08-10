/*let resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', resetGameFunction);

function resetGameFunction() {

}*/

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.add("flipped");
  
        const flippedCards = document.querySelectorAll(".flipped");
  
        if (flippedCards.length === 2) {
          if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
              flippedCards.forEach((card) => {
                  card.classList.remove("flipped");
                  card.classList.add("matched");
                  //card disappear function
              });
          } else {
              card.classList.remove("flipped");
              //turn back over function
          }
      }
    });
});


const matchedCards = document.querySelectorAll(".matched");
const modal = document.getElementById('modal');

if (matchedCards.length === 16) {
    function showWinScreen() {
        modal.style.display = "flex";
    }
    return showWinScreen;
}

const playAgain = document.getElementById('play-again');

playAgain.addEventListener('click', () => {
    //same function as reset button but add on hiding modal
    //showModal.style.display = "none";
});

//When the user clicks anywhere outside of the modal, close it??