export function checkboxes(events) {
    const categories = Array.from(new Set(events.map(event => event.category)))
    const checkboxContainer = document.getElementById('formContent')
    
    categories.forEach(category => {
        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.value = category
        checkbox.className = 'category-checkbox'
        checkbox.id = `checkbox-${category}`

        let label = document.createElement('label')
        label.htmlFor = `checkbox-${category}`
        label.textContent = category;

        let div = document.createElement('div')
        div.appendChild(checkbox)
        div.appendChild(label)

        checkboxContainer.appendChild(div)
    });
}

export function cards(events) {
    let container = document.getElementById("card-container")
    container.innerHTML = ''

    if (events.length === 0) {
        container.innerHTML = "It seems we don't have this event available 😟​"
        return;
    }

    events.forEach(event => {
        let card = document.createElement('div')
        card.className = "card text-center"
        card.innerHTML = `
            <img src="${event.image}" class="card-img-top" alt="${event.name}">
            <div class="card-body bg-danger-subtle">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <div class="price-details d-flex justify-content-between">
                    <p class="price">Price: $${event.price}</p>
                    <a href="../pages/details.html?id=${event._id}" class="btn btn-outline-danger">Details</a>
                </div>
            </div>`
        container.appendChild(card)
    });
}

export function textFilter(events, text) {
    return events.filter(event => {
        return event.name.toLowerCase().includes(text) || event.description.toLowerCase().includes(text)
    });
}

export function checkboxFilter(events, categories) {
    if (categories.length === 0) {
        return events
    }
    return events.filter(event => {
        return categories.includes(event.category)
    });
}

export function filters(events) {
    let textSearch = document.getElementById('textEvent').value.toLowerCase()
    let selectedCategories = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(cb => cb.value)

    let filteredByText = textFilter(events, textSearch)
    let filteredByCheckbox = checkboxFilter(filteredByText, selectedCategories)

    cards(filteredByCheckbox)
}

export function cardDetails(event) {
    let detailsContainer = document.getElementById('detailsCard')
    detailsContainer.innerHTML = `
      <div class="container d-flex justify-content-center">
        <div class="card w-75 mb-3 bg-danger-subtle">
          <div class="row g-0">
            <div class="col-md-6 align-content-center">
              <img src="${event.image}" class="img-fluid rounded-start" alt="${event.name}">
            </div>
            <div class="col-md-6 align-content-center justify-content-center">
              <div id="cardbody" class="card-body h-90">
                <h5 class="card-title text-center">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <p>Where: ${event.place}</p>
                <p>When: ${event.date}</p>
                <p>Price: $${event.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`
  }

export const API_URL = 'https://aulamindhub.github.io/amazing-api/events.json';


export function fetchDataFromAPI(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}

export function getHighestPercentajeAssistanceEvent(events) {
    let highestPercentajeAssistanceEventValue = 0;
    let highestPercentajeAssistanceEventName = "";

    events.forEach(event => {
        let percentajeAssistance = (event.assistance / event.capacity) * 100;

        if (percentajeAssistance > highestPercentajeAssistanceEventValue) {
            highestPercentajeAssistanceEventValue = percentajeAssistance;
            highestPercentajeAssistanceEventName = event.name;
        }
    });

    highestPercentajeAssistanceEventValue = highestPercentajeAssistanceEventValue.toFixed(2);

    return {
        highestPercentajeAssistanceEventValue,
        highestPercentajeAssistanceEventName
    };
}

export function getLowestPercentajeAssistanceEvent(events) {
    let lowestPercentajeAssistanceEventValue = Infinity;
    let lowestPercentajeAssistanceEventName = "";

    events.forEach(event => {
        let percentajeAssistance = (event.assistance / event.capacity) * 100;

        if (percentajeAssistance < lowestPercentajeAssistanceEventValue) {
            lowestPercentajeAssistanceEventValue = percentajeAssistance;
            lowestPercentajeAssistanceEventName = event.name;
        }
    });

    lowestPercentajeAssistanceEventValue = lowestPercentajeAssistanceEventValue.toFixed(2);

    return {
        lowestPercentajeAssistanceEventValue,
        lowestPercentajeAssistanceEventName
    };
}

export function getLargerCapacityEvent(events) {
    let largerCapacityEvent = 0;
    let largerCapacityEventName = "";

    events.forEach(event => {
        if (event.capacity > largerCapacityEvent) {
            largerCapacityEvent = event.capacity;
            largerCapacityEventName = event.name;
        }
    });

    return {
        largerCapacityEvent,
        largerCapacityEventName
    };
}

export function getStatisticsByCategoryUpcomingEvents(eventsData, dateData) {
    let categories = eventsData.map(event => event.category);
    categories = categories.filter((category, index) => categories.indexOf(category) === index);

    let upcomingEventsByCategory = [];

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let eventsByCategory = eventsData.filter(event => event.category === category);

        let upcomingEvents = eventsByCategory.filter(event => new Date(event.date) > new Date(dateData));

        if (upcomingEvents.length === 0) continue;

        let contEvent = 0;
        let revenuePerEventSuma = 0;
        let percentajeEstimateAssistanceTotal = 0;

        upcomingEvents.forEach(event => {
            contEvent++;
            let revenuePerEvent = event.price * (event.estimate || 0);
            revenuePerEventSuma += revenuePerEvent;
            let percentajeEstimateAssistance = (event.estimate / event.capacity) * 100;
            percentajeEstimateAssistanceTotal += percentajeEstimateAssistance;
        });

        revenuePerEventSuma = revenuePerEventSuma.toFixed(2);
        let revenueAverage = (revenuePerEventSuma / contEvent).toFixed(2);
        let percentajeEstimateAssistanceAverage = (percentajeEstimateAssistanceTotal / contEvent).toFixed(2);

        upcomingEventsByCategory.push({
            category,
            revenuePerEventSuma,
            revenueAverage,
            percentajeEstimateAssistanceAverage
        });
    }

    return upcomingEventsByCategory;
}

export function getStatisticsByCategoryPastEvents(eventsData, dateData) {
    let categories = eventsData.map(event => event.category);
    categories = categories.filter((category, index) => categories.indexOf(category) === index);

    let pastEventsByCategory = [];

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let eventsByCategory = eventsData.filter(event => event.category === category);

        let pastEvents = eventsByCategory.filter(event => new Date(event.date) < new Date(dateData));

        if (pastEvents.length === 0) continue;

        let contEvent = 0;
        let revenuePerEventSuma = 0;
        let percentajeAssistanceTotal = 0;

        pastEvents.forEach(event => {
            contEvent++;
            let revenuePerEvent = event.price * (event.assistance || 0);
            revenuePerEventSuma += revenuePerEvent;
            let percentajeAssistance = (event.assistance / event.capacity) * 100;
            percentajeAssistanceTotal += percentajeAssistance;
        });

        revenuePerEventSuma = revenuePerEventSuma.toFixed(2);
        let revenueAverage = (revenuePerEventSuma / contEvent).toFixed(2);
        let percentajeAssistanceAverage = (percentajeAssistanceTotal / contEvent).toFixed(2);

        pastEventsByCategory.push({
            category,
            revenuePerEventSuma,
            revenueAverage,
            percentajeAssistanceAverage
        });
    }

    return pastEventsByCategory;
}

export function createRowEventsStatics(highestData, lowestData, largerData) {
    return `
        <tr>
            <td>${highestData.highestPercentajeAssistanceEventName} <br> ${highestData.highestPercentajeAssistanceEventValue}%</td>
            <td>${lowestData.lowestPercentajeAssistanceEventName} <br> ${lowestData.lowestPercentajeAssistanceEventValue}%</td>
            <td>${largerData.largerCapacityEventName} <br> ${largerData.largerCapacityEvent}</td>
        </tr>
    `;
}

export function showEventsTableEventsStatics(events, container, highestData, lowestData, largerData) {
    if (events.length > 0) {
        container.innerHTML = createRowEventsStatics(highestData, lowestData, largerData);
    } else {
        container.innerHTML = `<h3 class="text-center">No events found.</h3>`;
    }
}

export function createRowEventsStaticsByCategory(eventsStaticsByCategory) {
    return `
        <tr>
            <td>${eventsStaticsByCategory.category}</td>
            <td>${eventsStaticsByCategory.revenuePerEventSuma > 0 ? `Total: $${eventsStaticsByCategory.revenuePerEventSuma} <br> Average Per Event: $${eventsStaticsByCategory.revenueAverage}` : "No data"}</td>            
            <td>${eventsStaticsByCategory.percentajeEstimateAssistanceAverage > 0 ? `${eventsStaticsByCategory.percentajeEstimateAssistanceAverage}%` : ""}</td>
        </tr>
    `;
}

export function showRowEventsStaticsByCategory(eventsStaticsByCategory, container) {
    let rowsHTML = "";
    eventsStaticsByCategory.forEach(categoryStat => {
        rowsHTML += createRowEventsStaticsByCategory(categoryStat);
    });
    container.innerHTML = rowsHTML;
}
