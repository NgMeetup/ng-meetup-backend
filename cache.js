var fs = require('fs'),
    url = require('url');

var cache = {};

cache.readFromCache = function (request, res, next) {
    var uri = url.parse(request.url, true);
    var file = uri.pathname.slice(1).replace(/\//g, '_') + '.json';
    fs.readFile('./data/' + file, 'utf8', function (err, data) {
        if (!err) {
            var cacheResponse = JSON.parse(data);
            var time = new Date().getTime();
            if (time - cacheResponse.time < 3600000) {
                res.json(cacheResponse['response']);
            } else {
                next();
            }
        } else {
            next();
        }
    });
};

cache.writeInCache = function (request, data) {
    var uri = url.parse(request.url, true);
    var file = uri.pathname.slice(1).replace(/\//g, '_') + '.json';
    var info = {
        response: data,
        time: new Date().getTime()
    };

    fs.writeFile('./data/' + file, JSON.stringify(info), function (err) {
        if (err) throw err;
    });
};

module.exports = cache;