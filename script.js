
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

document.getElementById("numberCards").addEventListener("change", (event) =>{
    event.preventDefault();
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
        newDiv.classList.add("card");
        newDiv.innerText = cardArray[i];
        console.log(newDiv);
        document.getElementById("cards").appendChild(newDiv);
    }
});
