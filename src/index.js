import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import { getWeatherData } from './js/search';

getWeatherData("new york city");