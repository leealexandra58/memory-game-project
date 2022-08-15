//start button
let timer;
let lastTwoFlippedArray = [];
let expectdMatchedPairs = 0;
let actualMatchedPairs = 0;
let start = 0;
let unlock = 0;
const modal = document.getElementById('modal');
const playAgain = document.getElementById('play-again');
const modalClose = document.querySelector('.close');

  document.getElementById("start").addEventListener("click", (event) => {
    if(document.getElementById("numberCards").value > 0){
      if(start === 0){
        event.preventDefault();
        let timeElapsedsecond = 00;
        let timeElapsedMin = 00;
        let timeElapsedHour = 00;
        timer = setInterval(() => {
          timeElapsedsecond++;
          if (timeElapsedsecond === 60) {
            timeElapsedsecond = 0;
            timeElapsedMin++;
            if (timeElapsedMin === 60) {
              timeElapsedMin = 0;
              timeElapsedHour++;
            }
          }
          document.getElementById("timer").innerText = `${timeElapsedHour}:${timeElapsedMin}:${timeElapsedsecond}`;
        }, 1000);
        start ++;
      }
    }
  });

//reset button
document.getElementById("reset").addEventListener("click", (event) => {
  event.preventDefault();
  clearBoard();
  shuffle();
  actualMatchedPairs = 0;
  clearInterval(timer);
  timeElapsedHour = 0;
  timeElapsedMin = 0;
  timeElapsedsecond = 0;
  document.getElementById("timer").innerText = `${timeElapsedHour}:${timeElapsedMin}:${timeElapsedsecond}`;
  if(start > 0){
    start --; 
  }
});

//shuffling mechanics
const findMostCommon = function (array) {
  let totals = {};
  for (const item of array) {
    if (totals[item]) {
      totals[item] += 1;
    } else {
      totals[item] = 1;
    }
  }
  return totals;
};

const shuffle = function () {
  //get the number of cards from the drop down
  let numberOfCards = document.getElementById("numberCards").value;

  writeGridDetailToContainer(Number(numberOfCards));
  expectdMatchedPairs = Number(numberOfCards) / 2;

  let cardArray = [];

  // generate random numbers and add them to the cardArray till the size specified by
  // numberOfCard
  while (cardArray.length < numberOfCards) {
    r = Math.ceil(Math.random() * (numberOfCards / 2));
    if (findMostCommon(cardArray)[r] === 2) {
      continue;
    } else {
      cardArray.push(r);
    }
  }

  // make cards and place number on it
  for (i = 0; i < numberOfCards; i++) {
    let newDiv = document.createElement("div");
    let frontface = document.createElement("div");
    let backface = document.createElement("div");
    frontface.classList.add("front-face");
    backface.classList.add("back-face");
    frontface.innerText = "?";
    backface.innerText = `${cardArray[i]}`;
    newDiv.classList.add("card");
    newDiv.appendChild(frontface);
    newDiv.appendChild(backface);
    //attach click event lisiter to the newDiv(card)
    newDiv.addEventListener("click", flipCardClickEvent);
    document.getElementById("card-container").appendChild(newDiv);
  }
};


//clear board function
const clearBoard = function () {
  while (document.getElementById("card-container").hasChildNodes()) {
    document.getElementById("card-container").removeChild(document.getElementById("card-container").firstChild);
  }
};

//adding cards
document.getElementById("numberCards").addEventListener("change", (event) => {
  event.preventDefault();
  clearBoard();
  shuffle();
  clearInterval(timer);
  timeElapsedHour = 0;
  timeElapsedMin = 0;
  timeElapsedsecond = 0;
  document.getElementById("timer").innerText = `${timeElapsedHour}:${timeElapsedMin}:${timeElapsedsecond}`;
  if(start > 0){
    start --;
  }
});

function writeGridDetailToContainer(numberOfCards) {

  // number of columns by number cards

  let cardsContainer = document.getElementById("card-container");
  //indicate the number of columns
  cardsContainer.style.setProperty("--columns", 1 / numberOfCards);
  let cardWidthPercentage = (1 / Math.sqrt(numberOfCards)) * 100;
  cardsContainer.style.setProperty("--card-width", cardWidthPercentage + "%");
}

//card flipping
function flipCardClickEvent(event) {
 if(start === 1){
    if(lastTwoFlippedArray.length < 2){
      // console.log(event.target);
      if(event.target.classList.value === "card" || event.target.classList.value === "front-face"){
        if(event.target.classList.value === "front-face"){
          event.target.parentNode.classList.add("flipped");
          let isFlipped = event.target.parentNode.getAttribute("show-numnber") == "true";
          event.target.parentNode.setAttribute("show-number", isFlipped ? "false" : "true");
        } else {
        event.target.classList.add("flipped");
        let isFlipped = event.currentTarget.getAttribute("show-number") == "true";
        event.currentTarget.setAttribute("show-number", isFlipped ? "false" : "true");
        }
        //if lastTwo is less than 1, add this cards value to it
        if (lastTwoFlippedArray.length < 2) {
          lastTwoFlippedArray.push(event.currentTarget); //add this card
        }

        //if we have two cards compare them
        if (lastTwoFlippedArray.length == 2) {
          // let firstCard = lastTwoFlippedArray[0];
          // let secondCard = lastTwoFlippedArray[1];
          let [firstCard,secondCard] = lastTwoFlippedArray

          let comparisonResult = firstCard.querySelector(".back-face").textContent == secondCard.querySelector(".back-face").textContent;

          if (comparisonResult === true) {
            // if the cards values are the same
            // remove the cards/make them invisible
            setTimeout(() => {
              firstCard.classList.add("matched");
              secondCard.classList.add("matched");
              lastTwoFlippedArray = [];
            }, 2000);
            actualMatchedPairs ++;
            if (actualMatchedPairs === expectdMatchedPairs){
              //show winning screen
              const modal = document.getElementById("modal");
              const playAgain = document.getElementById("play-again");
                
              toWinGame();
              function showWinScreen() {
                setTimeout(function() {
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
              }, 2500);
              }
                
              function toWinGame() {
                showWinScreen();
                clearInterval(timer);
              }

              if(unlock === 0){
                playAgain.addEventListener('click', function() {
                  modal.style.display = "none";
                  actualMatchedPairs = 0;
                  lastTwoFlippedArray = [];
                  clearBoard();
                  shuffle();
                  clearInterval(timer);
                  timeElapsedHour = 0;
                  timeElapsedMin = 0;
                  timeElapsedsecond = 0;
                  document.getElementById("timer").innerText = `${timeElapsedHour}:${timeElapsedMin}:${timeElapsedsecond}`;
                  unlock ++; 
                  start --;
                });
              }
              
            }
            
            //added time out function
            //show modal when player wins game
            function showWinScreen() {
              modal.style.display = "flex";
              clearInterval(timer);
            
            }
            
            //close modal when pressing "x"
            modalClose.addEventListener('click', function() {
              modal.style.display = "none";
            });  

          } else if (comparisonResult === false) {
            //the cards values are not the same
            // hide both cards again
            setTimeout(() => {
              firstCard.setAttribute("show-number", "false");
              secondCard.setAttribute("show-number", "false");
              lastTwoFlippedArray = [];
              while(document.querySelectorAll(".flipped").length > 0){
                document.querySelector(".flipped").classList.remove("flipped");
              }
            }, 2000);
          }
        }
      }
    }
  }
}

