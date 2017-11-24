// /* eslint-disable*/

const test = require('tape');
const shot = require('shot');
const router = require('./src/router'); //to be used to test router
const {homeHandler, staticFileHandler, resultsHandler} = require('./src/handler');
const getResults = require('./src/logic');
const url = "/results?postcode=E2%208RS&category=technology";

test('Initialise', (t) => {
  let num = 2
  t.equal(num, 2, 'two should equal two');
  t.end();
});


test('home route', (t) => {
  shot.inject(router, {method: 'get', url: '/'}, (res) => {
    t.equal(res.statusCode, 200, 'should respond with code 200');
    t.end();
  });
});

test('unknown route', (t) => {
  shot.inject(router, {method: 'get', url: '/nyan-cat'}, (res) => {
    t.equal(res.statusCode, 404, 'should be 404');
    t.end();
  });
});
