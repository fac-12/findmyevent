/* eslint-disable*/

const fs = require('fs');
const path = require('path');
const {getResults, filterByPostCode} = require('./logic');

const homeHandler = (request, response) => {
    fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), 'utf8', (err, file) => {
        if (err) {
            response.writeHead(500, {
                'content-type': 'text/plain'
            })
            response.end('server error');
        } else {
            response.writeHead(200, {
                'content-type': 'text/html'
            })
        };
        response.end(file);
    })
};

const staticFileHandler = (request, response, url) => {
    const extensionType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
    }
    const extension = url.split('.')[1];
    const filePath = part.join(__dirname, '..', url);
    fs.readFile(filePath, (err, file) => {
        if (err) response.end('error');
        response.writeHead(200, `Content-Type ${extensionType[extension]}`);
        response.end(file);
    })
};

const resultsHandler = url => {
    //this is the url that's come back. Need to call functions in logic and then go back to the front end. Querystring.
    let splitUrl = url.split('=');
    let postcode = splitUrl[1].split('&')[0];
    let category = splitUrl[2];
    getResults(postcode, category);
};

module.exports = {
    homeHandler,
    staticFileHandler,
    resultsHandler
}