const apiKey = require('./env.js');
console.log(apiKey);
let city = "paris"
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


const app = {
    init: function () {
        const getData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                });
                const data = await response.json();
                console.log("response", data);
            } catch (err) { console.log(err) }
        }
        getData();
    }
};

//cahrgement du DOM avant l'application
document.addEventListener('DOMContentLoaded', app.init());