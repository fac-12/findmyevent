// /* eslint-disable*/

// const tape = require('tape');
// const shot = require('shot');
const router = require('./src/router'); //to be used to test router
const {homeHandler, staticFileHandler, resultsHandler} = require('./src/handler');
const getResults = require('./src/logic');

//test to ensure tape is working
// test('Initialise', t => {
//   let num = 2
//   t.equal(num, 2, 'two should equal two');
//   t.end();
// })[[]]

// test('', t => {

// } )

const url = "/results?postcode=E2%208RS&category=technology";

resultsHandler(url);