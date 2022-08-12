//start button
let timer;
let lastTwoFlippedArray = [];
let expectdMatchedPairs = 0;
let actualMatchedPairs = 0;

document.getElementById("start").addEventListener("click", (event) => {
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
    document.getElementById(
      "timer"
    ).innerText = `${timeElapsedHour}:${timeElapsedMin}:${timeElapsedsecond}`;
  }, 1000);
});

//reset button
document.getElementById("reset").addEventListener("click", (event) => {
  event.preventDefault();
  //the following comment is to remove the evetn listener that allows for card flipping, needs to be finished by replacing test with a variable on that defines the function for the event listener for card flipping
  // document.getElementById("card-container").removeEventListener("click", test );
  //start --;
  clearBoard();
  shuffle();
  clearInterval(timer);
  timeElapsedHour = 0;
  timeElapsedMin = 0;
  timeElapsedsecond = 0;
  document.getElementById(
    "timer"
  ).innerText = `${timeElapsedHour}:${timeElapsedMin}:${timeElapsedsecond}`;
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
    document
      .getElementById("card-container")
      .removeChild(document.getElementById("card-container").firstChild);
  }
};

//adding cards
document.getElementById("numberCards").addEventListener("change", (event) => {
  event.preventDefault();
  clearBoard();
  shuffle();
});

function writeGridDetailToContainer(numberOfCards) {
  //
  // number of columns by number cards

  let cardsContainer = document.getElementById("card-container");
  //indicate the number of columns
  cardsContainer.style.setProperty("--columns", 1 / numberOfCards);
  let cardWidthPercentage = (1 / Math.sqrt(numberOfCards)) * 100;
  cardsContainer.style.setProperty("--card-width", cardWidthPercentage + "%");
}

function flipCardClickEvent(event) {
  console.log("flipCardClickEvent", event.currentTarget);
  let isFlipped = event.currentTarget.getAttribute("show-number") == "true";
  event.currentTarget.setAttribute("show-number", isFlipped ? "false" : "true");

  //if lastTwo is less than 1, add this cards value to it
  if (lastTwoFlippedArray.length < 2) {
    lastTwoFlippedArray.push(event.currentTarget); //add this card
    console.log(lastTwoFlippedArray);
  }

  //if we have two cards compare them
  if (lastTwoFlippedArray.length == 2) {
    // let firstCard = lastTwoFlippedArray[0];
    // let secondCard = lastTwoFlippedArray[1];
    let [firstCard,secondCard] = lastTwoFlippedArray

    let comparisonResult =
      firstCard.querySelector(".back-face").textContent ==
      secondCard.querySelector(".back-face").textContent;

    if (comparisonResult == true) {
      // the cards values are the same
      // remove the cards/make them invisible
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      lastTwoFlippedArray = [];

      // actualMatchedPairs = 5
      //actualMatchedPairs = actualMatchedPairs + 1
      // actualMatchedPairs = 5 + 1
      // actualMatchedPairs= 6
      actualMatchedPairs += 1;
     
    } else if (comparisonResult == false) {
      //the cards values are not the same
      // hide both cards again
      setTimeout(() => {
        firstCard.setAttribute("show-number", "false");
        secondCard.setAttribute("show-number", "false");
      }, 2_000);
      
      lastTwoFlippedArray = [];
    }
  }

  if (actualMatchedPairs === expectdMatchedPairs){
    //show winning screen
  }
}
