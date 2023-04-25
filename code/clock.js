let currentTimePeriod = '';

const timePeriod = {
    'Dawn': [0, 5],
    'Morning': [6, 11],
    'Afternoon': [12, 17],
    'Evening': [18, 23]
};


function getTimePeriod(hours) {
    var keys = Object.keys(timePeriod);


    for (let period in timePeriod) {
        if (hours >= timePeriod[period][0] && hours <= timePeriod[period][1]) {
            currentTimePeriod = period;
            break;
        }
    }
}


function getClock(init) {
    const date = new Date();
    const hours = parseInt(date.getHours());
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (init || seconds == 0) {
        getTimePeriod(hours);
    }

    clock.innerText = `${String((hours > 12) ? hours - 12 : hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const clock = document.querySelector('h1#clock');

getClock(true);
setInterval(getClock, 1000);
