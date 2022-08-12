const cards = document.querySelector(".card");

let clickedCards  = [];
let matched = [];

const modal = document.getElementById("modal");
const playAgain = document.querySelector(".play-again-btn");



function compareCards() {
    if (clickedCards.length === 2) {
        document.body.style.pointerEvents = "none";
    }

    if (clickedCards.length == 2 && clickedCards[0].getAttribute('name') === clickedCards[1].getAttribute('name')) {
        match();
    
    } else if (clickedCards.length === 2 && clickedCards[0].getAttribute('name') != clickedCards[1].getAttribute('name')) {
        noMatch();
    }
}

function match() {
    setTimeout(function() {

        clickedCards[0].classList.add("match");
        clickedCards[1].classList.add("match");

            matched.push(...clickedCards);

        document.body.style.pointerEvents = "auto";
        
        toWinGame();
        
        clickedCards = [];
        // have the matched cards disappear by using style.display = "none"

    }, 600);
}


function noMatch () {
    setTimeout(function() {

        clickedCards[0].classList.remove("flip");  
        clickedCards[1].classList.remove("flip");
        
        document.body.style.pointerEvents = "auto";

        clickedCards = [];

    }, 700);
}

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


 /* event listener when cards are clicked to be flipped. 
    create a function to add the class "flip" to the card
        
        add *addToOpened();*

    create the addToOpened function to push the flipped cards to open[]

    function addToOpened() {
        if () {
            opened.push();
        }
    
    //add in the function compareCards() from above.

        compareCards();
    } */
    

playAgain.addEventListener('click', function() {
    modal.style.display = "none";
    //reset function
});
