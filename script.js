//start button
let timer;


document.getElementById("start").addEventListener("click", (event) => {
    event.preventDefault();
   let timeElapsedsecond = 00;
   let timeElapsedMin = 00;
   let timeElapsedHour = 00;
   timer = setInterval(()=> {
        timeElapsedsecond ++;
        
        if(timeElapsedsecond === 60){
            timeElapsedsecond = 0;
            timeElapsedMin ++;
            if(timeElapsedMin === 60){
                timeElapsedMin = 0;
                timeElapsedHour ++;
            }
        }
        document.getElementById("timer").innerText = `${timeElapsedHour}:${timeElapsedMin}:${timeElapsedsecond}`;
   }, 1000);
});


//reset button
document.getElementById("reset").addEventListener("click", (event) => {
    event.preventDefault();
    //the following comment is to remove the evetn listener that allows for card flipping, needs to be finished by replacing test with a variable on that defines the function for the event listener for card flipping
    // document.getElementById("card-container").removeEventListener("click", test );
    clearBoard();
    shuffle();
    clearInterval(timer);
    timeElapsedHour = 0;
    timeElapsedMin = 0;
    timeElapsedsecond = 0;
    document.getElementById("timer").innerText = `${timeElapsedHour}:${timeElapsedMin}:${timeElapsedsecond}`;
})

//shuffling mechanics
const findMostCommon = function (array){
    let totals = {};
    for(const item of array){
        if(totals[item]){
            totals[item] += 1;
        }else{
            totals[item] = 1;
        }
    }
    return totals;
};

const shuffle = function(){
    let numberOfCards = document.getElementById("numberCards").value;
    let cardArray =[];
    while(cardArray.length < numberOfCards){
        r = Math.ceil(Math.random() * (numberOfCards / 2));
        if(findMostCommon(cardArray)[r] === 2){
            continue;
        } else {
            cardArray.push(r);
        }
    }
    for(i = 0; i < numberOfCards; i++){
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
        document.getElementById("card-container").appendChild(newDiv);
    }
};

//clear board function
const clearBoard = function (){
    while(document.getElementById("card-container").hasChildNodes()){
        document.getElementById("card-container").removeChild(document.getElementById("card-container").firstChild);
    }
}

//adding cards
document.getElementById("numberCards").addEventListener("change", (event) =>{
    event.preventDefault();
    clearBoard();
    shuffle();
});


