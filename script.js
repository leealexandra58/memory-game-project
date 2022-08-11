
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

const clearBoard = function (){
    while(document.getElementById("card-container").hasChildNodes()){
        document.getElementById("card-container").removeChild(document.getElementById("card-container").firstChild);
    }
}

document.getElementById("numberCards").addEventListener("change", (event) =>{
    event.preventDefault();
    clearBoard();
    shuffle();
});
