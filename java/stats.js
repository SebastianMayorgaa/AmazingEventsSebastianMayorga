import {API_URL, 
  fetchDataFromAPI, 
  getHighestPercentajeAssistanceEvent, 
  getLowestPercentajeAssistanceEvent, 
  getLargerCapacityEvent, 
  getStatisticsByCategoryUpcomingEvents, 
  getStatisticsByCategoryPastEvents, 
  showEventsTableEventsStatics, 
  showRowEventsStaticsByCategory 
} from '../modules/functions.js';

function main() {
  fetchDataFromAPI(API_URL).then(data => {
      if (!data) return;

      const events = data.events;
      const currentDate = new Date(data.currentDate);

      
      const eventsStatsContainer = document.getElementById('events-stats');
      const highestData = getHighestPercentajeAssistanceEvent(events);
      const lowestData = getLowestPercentajeAssistanceEvent(events);
      const largerData = getLargerCapacityEvent(events);
      showEventsTableEventsStatics(events, eventsStatsContainer, highestData, lowestData, largerData);

      const upcomingEventsStatsContainer = document.getElementById('upcoming-stats');
      const upcomingEventsByCategory = getStatisticsByCategoryUpcomingEvents(events, currentDate);
      showRowEventsStaticsByCategory(upcomingEventsByCategory, upcomingEventsStatsContainer);

      const pastEventsStatsContainer = document.getElementById('past-stats');
      const pastEventsByCategory = getStatisticsByCategoryPastEvents(events, currentDate);
      showRowEventsStaticsByCategory(pastEventsByCategory, pastEventsStatsContainer);
  });
}

main();


