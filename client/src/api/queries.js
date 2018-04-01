// Functions for querying the api

export function loadInitial() {
  return fetch('https://app.ticketmaster.com/discovery/v2/events.json?size=100&keyword=new+york&apikey=rgH0sHA67HAtSurrdPQON985G4BAMWTY',
  {
    method: 'GET'
  })
  .then((response) => response.json())
}

export function searchEventKeyword(keywords) {
  return fetch('https://app.ticketmaster.com/discovery/v2/events.json?size=100&apikey=rgH0sHA67HAtSurrdPQON985G4BAMWTY'+keywords,
  {
    method: 'GET'
  })
  .then((response) => response.json())
}

export function getEventDetails(id) {
  return fetch('https://app.ticketmaster.com/discovery/v2/events/'+id+'.json?apikey=rgH0sHA67HAtSurrdPQON985G4BAMWTY',
  {method: 'Get'})
  .then((response) => response.json())
}
