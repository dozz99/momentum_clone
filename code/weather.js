const API_KEY = '2fd12e2d540d7ec83ec75ac8457995a4';

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    console.log(url);

    fetch(url).then(response => response.json()).then(data => {
        const weatherContainer = document.querySelector('#temp');
        const cityContainer = document.querySelector('#city');

        const city = data.name;
        const weather = data.weather[0].main;
        const imgURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        cityContainer.innerText = city;
        
        const imgContainer = document.querySelector('#weather img');
        imgContainer.classList.add('overlay');
        imgContainer.src = imgURL;
        weatherContainer.innerText = `${weather}\t\t${data.main.temp}`;

        console.dir(imgContainer);

        console.log(city);
        console.log(weather);
    });
}

function onGeoError(){
    alert('I can not find you. No weather for you.');
}

var result = navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
console.dir(result);