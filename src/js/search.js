import { apiKey } from "../stuffs/config";
import { addWeatherCard } from "./display";

export let weatherData;

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
    for (let i = 0; i < amount; ++i) {
        addWeatherCard(weatherData.days[i]);
    }
}

const setSearchBtn = () => {
    const btn = document.getElementById("search-btn");
    btn.addEventListener('click', async () => {
        try {
            document.getElementById('search-results').textContent = '';
            const city = document.getElementById('location').value;
            weatherData = await getWeatherData(city);
            displayCards(5);
        } catch (err) {
            console.log('aaa');
        }
    });
};

const setSearchBarEvent = () => {
    const bar = document.getElementById('location');
    bar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('search-btn').click();
        }
    })
}

export const initSearch = () => {
    setSearchBtn();
    setSearchBarEvent();
}