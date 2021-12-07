const apiKey = require('./env.js');
console.log(apiKey);
let city = "";

const app = {
    init: function () {
        document.querySelector('.loader').classList.add('hidden');
        document.querySelector('.search__form').addEventListener('submit', (event) => handleValueCity(event))
        const getData = async () => {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`;
            try {
                document.querySelector('.loader').classList.remove('hidden');
                const response = await fetch(url, {
                    method: 'GET',
                });

                const data = await response.json();
                if (data.message === "city not found") {
                    document.querySelector('.loader').classList.add('hidden');
                    document.querySelector('.search__form__errorMessage').textContent = "La ville choisie n'est pas correcte";
                    document.querySelector('#city').textContent = "";
                    document.querySelector('#temp').textContent = "";
                    document.querySelector('#humidity').textContent = "";
                    document.querySelector('#wind').textContent = "";

                }
                console.log("response", data);
                document.querySelector('#city').textContent = data.name;
                document.querySelector('#temp').textContent = `${Math.round(data.main.temp)}°`;
                document.querySelector('#humidity').textContent = `${data.main.humidity}%`;
                document.querySelector('#wind').textContent = `${data.wind.speed}km/h`;
                document.querySelector('.search__form__errorMessage').textContent = "";
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
                document.querySelector('.loader').classList.add('hidden');
            } catch (err) {
                console.log(err)
            }
        }
        const handleValueCity = (event) => {
            event.preventDefault();
            city = event.target[0].value;
            getData();
        }


    }

};

//chargement du DOM avant l'application
document.addEventListener('DOMContentLoaded', app.init());