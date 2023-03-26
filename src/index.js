import './css/styles.css';
import debounce from 'lodash.debounce';
import './fetchCountries';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
            if (result.status === 404) {
                throw error;
            }
            if (result.length > 10) {
                renderTooMany()
            } else if (result.length > 1) {
                listOfCountries.insertAdjacentHTML('afterbegin', renderCountries(result));
            } else {
                countryInfo.insertAdjacentHTML('afterbegin', renderOneCountry(result));
            }
        })
        .catch(error => onError(error));

}

function renderTooMany() {
    Notify.info("Too many matches found. Please enter a more specific name.");
}

function renderCountries(result) {
    let listMarkup = []
    result.forEach(element => {
        listMarkup.push(
            `<li class="country-list-item">
                <img class="country-list-img"
                src="${element.flags.svg}" 
                alt="the flag of ${element.name.common}" 
                width="5%" 
                height="5%"
                >
                ${element.name.common}
            </li>`)
    });
    return listMarkup.join('');
}

function renderOneCountry(result) {
    console.log(result[0].flags.svg);
    return `
    <p class="country-descr">
        <img src="${result[0].flags.svg}" alt="the flag of ${result[0].name.common}" width="5%" height="5%">
        <span class="country-name">${result[0].name.common}</span>
    </p>
    <ul class="country-details-list">
        <li class="country-details-item">
            <span class="country-details">Capital: </span>${result[0].capital}
        </li>
        <li class="country-details-item">
            <span class="country-details">Population: </span>${result[0].population}
        </li>
        <li class="country-details-item">
            <span class="country-details">Languages: </span>${Object.values(result[0].languages).join(', ')}
        </li>
    </ul>
    `;
}

function onError(error) {
    Notify.failure("Oops, there is no country with that name")
}