/* eslint-disable*/

const request = require('request');
const {homeHandler, staticFileHandler, resultsHandler} = require('./handler');

//<-----get env key to work----------->
// const env = require('env2')('./../env');

const EVENTFUL_API = 'z5cBwm3jP9DZ6fkj';

const getResults = (postcode, category) => {
  let url = `http://api.eventful.com/json/events/search?...&where=${postcode}&category=${category}&within=5&app_key=${EVENTFUL_API}`;
  request(url, (error, response, body) => {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      let results = JSON.parse(body);
      filterByPostCode(results.events.event);
    });
}

const filterByPostCode = events => {
  let locations = [];
  let postCodes = events.map(a => [locations.push(a.title) + locations.push(parseFloat(a.latitude)) + locations.push(parseFloat(a.longitude))]);
  let results = [];
  for (var i = 0; i < locations.length; i + 3) {
    results.push(locations.splice([i], [i + 3]));
  }
  console.log(results);
}

module.exports = {getResults, filterByPostCode}