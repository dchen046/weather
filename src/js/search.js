export const getWeatherData = async (location) => {
    const apiKey = 'VE2WD7JC5TQSNF9KRY5T75SYT'
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}