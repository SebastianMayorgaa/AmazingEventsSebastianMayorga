import { checkboxes, cards, textFilter, checkboxFilter, filters } from '../modules/functions.js';

let url = 'https://aulamindhub.github.io/amazing-api/events.json';
let eventsData = [];

fetch(url)
    .then(response => response.json())
    .then(data => {
        eventsData = data.events;
        console.log(data.events);
        
        checkboxes(eventsData);
        filters(eventsData);
    });

document.getElementById('textEvent').addEventListener('keyup', () => filters(eventsData));
document.getElementById('formContent').addEventListener('click', (e) => {
    if (e.target.classList.contains('category-checkbox')) {
        filters(eventsData);
    }
});
