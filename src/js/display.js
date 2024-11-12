import { weatherData } from "./search";

const recents = [];

export const addWeatherCard = (data) => {
    const results = document.getElementById('search-results');
    results.appendChild(createWeatherCard(data));
}

const createWeatherCard = (data) => {
    const card = document.createElement('div');
    const cardClasses = 'd-flex flex-column justify-content-center text-center container card mx-auto'.split(' ');
    card.classList.add(...cardClasses);
    const info = [createDate(data), createIcon(data), createTemp(data)];
    info.forEach( (x) => {
        card.appendChild(x);
    });
    return card;
}

const createDate = (data) => {
    const p = document.createElement('h4');
    const date = data.datetime.split('-');
    p.textContent = `${date[1]}/${date[2]}`;
    return p;
}

const createIcon = (data) => {
    const condition = data.conditions;
    const icon = document.createElement('i');
    let iconClass;
    let color;
    if (condition.includes('Clear')) {
        iconClass = 'fas fa-sun'.split(' ');
        color = '#FFD43B'
    } else if (condition.includes('Rain')) {
        iconClass = 'fas fa-umbrella'.split(' ');
        color = '#74C0FC'
    } else {
        iconClass = 'fas fa-cloud'.split(' ');
        color = '#B6B6B4';
    }

    iconClass.push('m-3', 'fa-2xl');
    icon.classList.add(...iconClass);
    icon.setAttribute('style', `color: ${color}`);
    return icon;
}

const createTemp = (data) => {
    const temp = document.createElement('h4');
    temp.textContent = data.temp;
    return temp; 
}