const request = require('request');
//<-----get env key to work----------->
// const env = require('env2')('./../env');

const EVENTFUL_API = 'z5cBwm3jP9DZ6fkj';
const postcode = 'e2%208dp';
const category = 'comedy';

const getResults = (postcode, category) => {
  const apiCall = (module) => {
    module('http://api.eventful.com/json/events/search?...&where=' + postcode + '&category=' + category + '&within=5&app_key=' + EVENTFUL_API, function (error, response, body) {
      console.log('error:', error); //to use for error handling
      console.log('statusCode:', response && response.statusCode);
      let results = JSON.parse(body);
      filterByPostCode(results.events.event);
    });
  };
  apiCall(request);
}

const filterByPostCode = (events) => {
  let locations = []
  let postCodes = events.map(a => [locations.push(a.title) + locations.push(parseFloat(a.latitude)) + locations.push(parseFloat(a.longitude))]);
  let results = [];
  for (var i = 0; i < locations.length; i + 3) {
    results.push(locations.splice([i], [i + 3]));
  }
  console.log(results);
}