const tape = require('tape');
const shot = require('shot');
const router = require('./router'); //to be used to test router

//test to ensure tape is working
test('Initialise', t =>{
  let num = 2
  t.equal(num, 2, 'two should equal two');
  t.end();
})

const url = "/results?postcode=E28RS&category=technology";