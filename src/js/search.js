import { apiKey } from "../stuffs/config";

export const getWeatherData = async (location) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}