import {cardDetails} from "../modules/functions.js";

let urlParams = new URLSearchParams(window.location.search)
let eventId = urlParams.get('id')

let url = ('https://aulamindhub.github.io/amazing-api/events.json')

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.events && data.events.length > 0) {
      let eventSelected = data.events.find(event => event._id == eventId)
       if (eventSelected) {
        cardDetails(eventSelected)
      } 
    }
  })