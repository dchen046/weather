export let recents = [];

export const addWeatherCard = (data) => {
    const results = document.getElementById('search-results');
    const card = createWeatherCard(data);
    results.appendChild(card);
    localStorage.setItem('recents', JSON.stringify(recents));
}

const createWeatherCard = (data) => {
    const card = document.createElement('div');
    const cardClasses = 'container d-flex flex-column justify-content-center card'.split(' ');
    card.classList.add(...cardClasses);

    const info = [
        createDate(data), 
        createIcon(data), 
        createTemp(data)
    ];
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

const createTemp = (data, degree = 'F') => {
    const temp = document.createElement('h4');
    const val = data.temp;
    if (degree === 'C') {
        val = (val - 32) * (5/9);
    }
    temp.textContent = `${val}`;
    return temp; 
}

const addRecents = () => {
    const recentDiv = document.getElementById('recents');
    for (let i = 0; i < recents.length; ++i) {
        recentDiv.appendChild(createRecentCard(recents[i]));
    }
}

const createRecentCard = (data) => {
    const recentCard = document.createElement('div');
    const cardClasses = 'container d-flex flex-column justify-content-center recent-card'.split(' ');
    recentCard.classList.add(...cardClasses);
    const cardInfo = [
        createLocation(data),
        createCoords(data)
    ];
    cardInfo.forEach( x => {
        recentCard.appendChild(x);
    })
    return recentCard;
}

const createLocation = (data) => {
    const location = document.createElement('h4');
    location.textContent = data.address;
    return location;
}

const createCoords = (data) => {
    const coords = document.createElement('h4');
    const val = `${data.latitude}, ${data.longitude}`;
    coords.textContent = val;
    return coords;
}

export const createRecents = () => {
    const storedRecents = localStorage.getItem('recents');
    if (storedRecents) {
        recents = JSON.parse(storedRecents);
        addRecents();
    }
}