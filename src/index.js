import './css/styles.css';
import debounce from 'lodash.debounce';
import './fetchCountries';
import { fetchCountries } from './fetchCountries';
import { renderCountries, renderOneCountry } from './render';
import { errorTooMany, onError } from './errors';


const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const listOfCountries = document.querySelector('ul.country-list');
const countryInfo = document.querySelector('div.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    listOfCountries.innerHTML = '';
    countryInfo.innerHTML = '';
    const name = evt.target.value.trim();
    if (name === "") {
        return
    }
    fetchCountries(name)
        .then(result => {
            if (result.length > 10) {
                errorTooMany();
            } else if (result.length > 1) {
                listOfCountries.insertAdjacentHTML('afterbegin', renderCountries(result));
            } else {
                countryInfo.insertAdjacentHTML('afterbegin', renderOneCountry(result[0]));
            }
        })
        .catch(error => onError(error));

}