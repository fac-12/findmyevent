const request = require('request');
// const env = require('env2')('./../env');
// const postCode = userInput;


const apiCall = (module, postcode, category) => {
module('http://api.eventful.com/json/events/search?...&where='+postcode+'&category='+category'&within=5&app_key=' + EVENTFUL_API, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    let results = JSON.parse(body);
    console.log(results.events.event);
  });
};

apiCall(request);

// const filter = () => {
//
// }
