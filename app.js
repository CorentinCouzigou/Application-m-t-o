const TOKEN_API = process.env.TOKEN;
const schema = require('./validation/cityValidation.js');
let city = "";


const app = {
    // fonction qui initialise mon application
    init: function () {
        // on cache le loader sans appel API
        document.querySelector('.loader').classList.add('hidden');
        // j'ajoute un écouteur d'événement à la soumission du formulaire pour lancer un événement
        document.querySelector('.search__form').addEventListener('submit', (event) => handleValueCity(event))
        // fonction en charge de la récupération des données depuis l'api tiers openweathermap
        const getData = async () => {
            // appel à l'api d'openweathermap 
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${TOKEN_API}`;
            // j'utilise un try catch pour visiualiser d'éventuelles erreurs de cet appel api
            try {
                // je fais apparaitre le loader le temps de l'appel api
                document.querySelector('.loader').classList.remove('hidden');
                const response = await fetch(url, {
                    method: 'GET',
                });
                const data = await response.json();
                // je gère le cas d'erreur ou la ville n'est pas trouvé par l'api d'openweathermap
                if (data.message === "city not found") {
                    document.querySelector('.loader').classList.add('hidden');
                    document.querySelector('.search__form__errorMessage').textContent = "La ville choisie n'est pas correcte";
                    document.querySelector('#city').textContent = "";
                    document.querySelector('#temp').textContent = "";
                    document.querySelector('#humidity').textContent = "";
                    document.querySelector('#wind').textContent = "";
                    document.querySelector('#weather').textContent = "";
                }
                // Une fois les données reçes je les implémentent dans le dom
                document.querySelector('#city').textContent = data.name;
                document.querySelector('#temp').textContent = `${Math.round(data.main.temp)}°`;
                document.querySelector('#humidity').textContent = `${data.main.humidity}%`;
                document.querySelector('#wind').textContent = `${Math.round(data.wind.speed)}km/h`;
                document.querySelector('#weather').textContent = data.weather[0].description;
                document.querySelector('.search__form__errorMessage').textContent = "";
                // Ce switch me permet de définir un arrière plan en fonction de la météo
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case "Clear":
                        document.querySelector('.backgroundImage').setAttribute("src", "./images/clair.jpg")
                        document.querySelector('.backgroundImage').addEventListener('load', (event) => { document.querySelector('.loader').classList.add('hidden'); });
                        break;
                    case "Clouds" || "Scattered clouds" || "Few clouds":
                        document.querySelector('.backgroundImage').setAttribute("src", "./images/clouds.jpg")
                        document.querySelector('.backgroundImage').addEventListener('load', (event) => { document.querySelector('.loader').classList.add('hidden'); })
                        break;
                    case "Rain" || "Light rain" || "Shower rain":
                        document.querySelector('.backgroundImage').setAttribute("src", "./images/pluie.jpg")
                        document.querySelector('.backgroundImage').addEventListener('load', (event) => { document.querySelector('.loader').classList.add('hidden'); })
                        break;
                    case "Thunderstorm":
                        document.querySelector('.backgroundImage').setAttribute("src", "./images/thunder.jpg")
                        document.querySelector('.backgroundImage').addEventListener('load', (event) => { document.querySelector('.loader').classList.add('hidden'); })
                        break;
                    case "Fog" || "Mist":
                        document.querySelector('.backgroundImage').setAttribute("src", "./images/brume.jpg")
                        document.querySelector('.backgroundImage').addEventListener('load', (event) => { document.querySelector('.loader').classList.add('hidden'); })
                        break;
                    case "Snow":
                        document.querySelector('.backgroundImage').setAttribute("src", "./images/neige.jpg")
                        document.querySelector('.backgroundImage').addEventListener('load', (event) => { document.querySelector('.loader').classList.add('hidden'); })
                        break;
                }
                // une fois l'appel api terminé et reussi je retire le loader de ma page
                // document.querySelector('.loader').classList.add('hidden');
            } catch (err) {
                // visualisation de l'erreur en cas d'échec de l'appel api
                console.log(err)
            }
        }
        // fonction qui gère la soumission de la valeur rentrée par l'utilisateur dans mon formulaire
        const handleValueCity = (event) => {
            // j'effectue un event.prenventDefault pour empécher le rechargement de la page
            event.preventDefault();
            // je recupère la valeur saisie par l'utilisateur et je vérifie sa valeur avec la bibliothèque Joi
            let validation = schema.validate({
                city: event.target[0].value
            })
            //traitement en cas d'erreur lros de la saisie d'un utilisateur
            if (validation.error) {
                console.log("Error Joi Validation", validation.error)
                document.querySelector('.search__form__errorMessage').textContent = "La ville choisie n'est pas correcte";
                document.querySelector('#city').textContent = "";
                document.querySelector('#temp').textContent = "";
                document.querySelector('#humidity').textContent = "";
                document.querySelector('#wind').textContent = "";
                document.querySelector('#weather').textContent = "";

            }
            else {
                // je Change la valeur de city
                city = event.target[0].value;
                //  je lance mon appel api avec la nouvelle valeur pour city
                getData();
            }
        }


    }

};

//chargement du DOM avant l'application
document.addEventListener('DOMContentLoaded', app.init());