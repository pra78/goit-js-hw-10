export function renderCountries(result) {
    let listMarkup = []
    result.forEach( ({flags, name}) => {
        listMarkup.push(
            `<li class="country-list-item">
                <img class="country-list-img"
                src="${flags.svg}" 
                alt="the flag of ${name.common}" 
                width="5%" 
                height="5%"
                >
                ${name.common}
            </li>`)
    });
    return listMarkup.join('');
}

export function renderOneCountry({flags, name, capital, population, languages}) {
    return `
    <p class="country-descr">
        <img src="${flags.svg}" alt="the flag of ${name.common}" width="5%" height="5%">
        <span class="country-name">${name.common}</span>
    </p>
    <ul class="country-details-list">
        <li class="country-details-item">
            <span class="country-details">Capital: </span>${capital}
        </li>
        <li class="country-details-item">
            <span class="country-details">Population: </span>${population}
        </li>
        <li class="country-details-item">
            <span class="country-details">Languages: </span>${Object.values(languages).join(', ')}
        </li>
    </ul>
    `;
}