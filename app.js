const apiKey = require('./env.js');
console.log(apiKey);
let city = "Paris";

const app = {
    init: function () {
        document.querySelector('.search__form').addEventListener('submit', (event) => handleValueCity(event))
        const getData = async () => {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                });
                console.log(url)
                const data = await response.json();
                console.log("response", data);
                document.querySelector('#city').textContent = data.name;
                document.querySelector('#temp').textContent = `${data.main.temp}°`;
                document.querySelector('#humidity').textContent = `${data.main.humidity}%`;
                document.querySelector('#wind').textContent = `${data.wind.speed}km/h`;
                switch (data.weather[0].main) {
                    case "Clear":
                        document.querySelector('.container').setAttribute("style", "background-image:url('./images/clair.jpg');")
                        break;
                    case "Clouds" || "Scattered clouds" || "Few clouds":
                        document.querySelector('.container').setAttribute("style", "background-image:url('./images/clouds.jpg');")
                        break;
                    case "Rain" || "Light rain" || "Shower rain":
                        document.querySelector('.container').setAttribute("style", "background-image:url('./images/pluie.jpg');")
                        break;
                    case "Thunderstorm":
                        document.querySelector('.container').setAttribute("style", "background-image:url('./images/thunder.jpg');")
                        break;
                    case "Mist":
                        document.querySelector('.container').setAttribute("style", "background-image:url('./images/brume.jpg');")
                        break;
                    case "Snow":
                        document.querySelector('.container').setAttribute("style", "background-image:url('./images/neige.jpg');")
                        break;
                }
            } catch (err) { console.log(err) }
        }
        const handleValueCity = (event) => {
            event.preventDefault();
            console.log(event.target[0].value)
            city = event.target[0].value;

            getData();
        }


        getData();

    }

};

//cahrgement du DOM avant l'application
document.addEventListener('DOMContentLoaded', app.init());