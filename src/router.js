/* eslint-disable*/

const {homeHandler, staticFileHandler, resultsHandler} = require('./handler');

const router = (request, response) => {
    const endpoint = request.url;
    if (endpoint === '/') {
        homeHandler(request, response);
    } else if (endpoint === '/public') {
        staticFileHandler(request, response, url);
    } else if (endpoint === '/results') {
        resultsHandler(request, response, url);
    } else {
        response.writeHead('404', {
            'Content-Type': 'text/html'
        });
        response.end('404, file not found');
    }
}

module.exports = router;