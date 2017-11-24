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

const addPercentagePostcode = postcode => {
    let array = postcode.split('');
    array.splice(-3, 0, "%20")
    return array.join('')
}

module.exports = { filterByPostCode, addPercentagePostcode }