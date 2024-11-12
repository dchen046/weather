import { createTemp } from "./display";

const createTitle = (data) => {
    const title = document.createElement('h2');
    title.textContent = capitalizeTitle(data.address);
    return title;
}

const capitalizeTitle = (title) => {
    const words = title.split(' ');
    for (let i = 0; i < words.length; ++i) {
        let firstLetter = words[i].charAt(0).toUpperCase();
        words[i] = firstLetter + words[i].slice(1);
    }
    return words.join(' ');
}

const createForecastInfo = (data) => {
    const div = document.createElement('div');
    const divClasses = 'text-center'.split(' ');
    div.classList.add(...divClasses);
    
    const items = [
        createTemp(data, 'h1'),
        createFeelsLike(data),
        createSunset(data),
    ]
    items.forEach( item => {
        div.appendChild(item);
    })

    return div;
}

const createFeelsLike = (data) => {
    const div = document.createElement('div');
    const feelsDiv = document.createElement('p');
    const newLine = '\r\n';
    const feels = `Feels like: ${data.feelslike}`;
    const humid = `Humidity: ${data.humidity}`;
    feelsDiv.innerText = feels + newLine + humid;
    div.appendChild(feelsDiv);
    return div;
}

const createSunset = (data) => {
    const div = document.createElement('div');
    const sunsetDiv = document.createElement('p');
    const sunrise = `Sunrise: ${data.sunrise} \n`
    const sunset = `Sunset: ${data.sunset}\n`
    sunsetDiv.innerText = sunrise + sunset;
    div.appendChild(sunsetDiv);
    return div;
}

const addForecast = (data) => {
    const forecaseDiv = document.getElementById('forecast');
    const items = [
        createTitle(data),
        createForecastInfo(data.currentConditions),
    ]

    items.forEach( item => {
        forecaseDiv.appendChild(item);
    });
}

export const displayForecast = (data) => {
    addForecast(data);
}