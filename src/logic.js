const request = require('request');
// const env = require('env2')('./../env');
// const postCode = userInput;
const EVENTFUL_API ='z5cBwm3jP9DZ6fkj';
const postcode = 'e2%208dp';
const category = 'comedy';

const apiCall = (module) => {
module('http://api.eventful.com/json/events/search?...&where='+postcode+'&category='+category+'&within=5&app_key=' + EVENTFUL_API, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    let results = JSON.parse(body);
    filterByPostCode(results.events.event);
  });
};

apiCall(request);

const filterByPostCode = (events) => {
let postCodes = events.map(a => a.postal_code);
   console.log(postCodes);

}
