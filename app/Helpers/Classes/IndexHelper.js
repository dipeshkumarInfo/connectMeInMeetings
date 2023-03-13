const checkClassDay = (classes /* this must be an object which is giving some key values */) => {
    let currentDay = new Date().getDay();
    let proceed = false;

    if(classes.routine == "daily") { 
        proceed = true;
    }else if(classes.routine == "alternative"){
        classes.days.forEach(function(day) {
            if(currentDay == day.order)
            {
                proceed = true;
            }
        });
    }
    return proceed;
}


const leftTimeInSeconds = (time) => {
    const targetTime = new Date();
    const [hours, minutes] = time.split(":");
    
    targetTime.setHours(hours);
    targetTime.setMinutes(minutes);
    targetTime.setSeconds(0);
    
    const timeDiff = targetTime.getTime() - Date.now();
    return Math.floor(timeDiff / (1000 * 60));
}

module.exports = {
    checkClassDay,
    leftTimeInSeconds
}