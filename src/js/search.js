import { apiKey } from "../stuffs/config";
import { recents, addWeatherCard, createRecents } from "./display";
import { displayForecast } from "./forecast";

let weatherData;

const getWeatherData = async (location) => {
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('search-error').textContent = '';
        return data;
    } catch (err) {
        const msg = "Could not find city"
        document.getElementById('search-error').textContent = msg;
        throw msg;
    }
}

const displayCards = (amount) => {
    for (let i = 1; i <= amount; ++i) {
        addWeatherCard(weatherData.days[i]);
    }
}

const setSearchBtn = () => {
    const btn = document.getElementById("search-btn");
    btn.addEventListener('click', async () => {
        try {
            resetContentDivs();
            const city = document.getElementById('location').value;
            weatherData = await getWeatherData(city);
            saveData(weatherData);
            displayForecast(weatherData);
            displayCards(5);
            console.log(weatherData);
        } catch (err) {
            console.log('aaa');
        }
    });
};

const saveData = (data) => {
    for (let i = 0; i < recents.length; ++i) {
        if (recents[i].address === data.address) {
            return;
        }
    }
    if (recents.length >= 3) {
        recents.splice(0, 1);
    }
    recents.push(data);
}

const setSearchBarEvent = () => {
    const bar = document.getElementById('location');
    bar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('search-btn').click();
        }
    })
}

export const initSearch = () => {
    // localStorage.setItem('recents', 'a');
    setSearchBtn();
    setSearchBarEvent();
    createRecents();
}

const resetContentDivs = () => {
    document.getElementById('search-results').textContent = '';
    document.getElementById('recents').textContent = '';
    document.getElementById('forecast').textContent = ' ';
}
