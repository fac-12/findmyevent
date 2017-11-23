/* eslint-disable*/
const { homeHandler, staticFileHandler, resultsHandler } = require('./handler');

const filterByPostCode = events => {
    let locations = [];
    let postCodes = events.map(a => [locations.push(a.title) + locations.push(parseFloat(a.latitude)) + locations.push(parseFloat(a.longitude))]);
    let results = [];
    for (var i = 0; i < locations.length; i + 3) {
        results.push(locations.splice([i], [i + 3]));
    }
    return results;
}

module.exports = { filterByPostCode }