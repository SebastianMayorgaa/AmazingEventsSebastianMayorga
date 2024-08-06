import {checkboxes, cards, textFilter, checkboxFilter, filters} from "../modules/functions.js";

let url = ('https://aulamindhub.github.io/amazing-api/events.json')
let eventsData = []
let currentDate

fetch(url)
.then(response => response.json())
.then(data => {
    eventsData = dateFilter(data.events, data.currentDate)
    currentDate = data.currentDate
    checkboxes(eventsData)
    filters(eventsData)
});

document.getElementById('textEvent').addEventListener('keyup', () => filters(eventsData))
document.getElementById('formContent').addEventListener('click', (e) => {
    if (e.target.classList.contains('category-checkbox')) {
        filters(eventsData)
    }
});

function dateFilter(events, currentDate) {
    return events.filter(event => event.date <= currentDate)
}
