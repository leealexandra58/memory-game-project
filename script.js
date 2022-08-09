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