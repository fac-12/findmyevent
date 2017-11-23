/* eslint-disable*/
const requestModule = require('request');
const fs = require('fs');
const path = require('path');
const { filterByPostCode } = require('./logic');

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
    const filePath = path.join(__dirname, '..', url);
    fs.readFile(filePath, (err, file) => {
        if (err) response.end('error');
        response.writeHead(200, 'Content-Type: ' + extensionType[extension]);
        response.end(file);
    })
};

const resultsHandler = (request, response, url) => {
    console.log(url)
    let splitUrl = url.split('=');
    let postcode = splitUrl[1].split('&')[0];
    let part2 = postcode.slice(3, )
    let part1 = postcode.slice(0, 3)
    let pc = part1 + "%20" + part2
    let category = splitUrl[2];
    let APIurl = `http://api.eventful.com/json/events/search?...&where=${pc}&category=${category}&within=5&app_key=z5cBwm3jP9DZ6fkj`;

    requestModule(APIurl, (error, res, body) => {
        if (error) {
            response.writeHead(500, {
                'content-type': 'text/plain'
            })
            response.end('server error');
        } else {
            response.writeHead(200, {
                'content-type': 'application/json'
            })
            let results = JSON.parse(body);
            let data = filterByPostCode(results.events.event);
            response.end(JSON.stringify(data));
        }
    });

};

module.exports = {
    homeHandler,
    staticFileHandler,
    resultsHandler
}