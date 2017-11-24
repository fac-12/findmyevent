/* eslint-disable*/

const { homeHandler, staticFileHandler, resultsHandler } = require('./handler');

const router = (request, response) => {
    const endpoint = request.url;
    if (endpoint === '/') {
        homeHandler(request, response);
    } else if (endpoint.indexOf("public") !== -1) {
        staticFileHandler(request, response, endpoint);
    } else if (endpoint.indexOf("results") !== -1) {
        resultsHandler(request, response, endpoint);
    } else {
        response.writeHead('404', {
            'Content-Type': 'text/html'
        });
        response.end('404, file not found');
    }
}

module.exports = router;