var app = require('./app'),
    url = require('url'),
    config = require('./config'),
    cache = require('./cache'),
    oauth_token;

meetup = require('./node_modules/meetup-api/lib/meetup')({
    oauth: {
        key: config.key,
        secret: config.secret
    }
});

function oauth(request, response, next) {
    var uri = url.parse(request.url, true);
    oauth_token = oauth_token || uri.query.oauth_token;
    if (oauth_token) {
        meetup.getOAuthAccessToken(oauth_token, function () {
            next();
        });
    } else {
        meetup.getOAuthRequestToken(function (error, Url) {
            response.writeHead(302, {
                'Location': Url
            });
            response.end();
        });
    }
}

function getGroup(req, response) {
    meetup.getGroup({
        urlname: config.urlname
    }, function (err, obj) {
        if (!err) cache.writeInCache(req, obj);
        response.end(JSON.stringify(err ? err : obj));
    });
}

function getEvents(req, response) {
    meetup.getEvents({
        group_urlname: config.urlname,
        status: "past,upcoming",
        order: 'time',
        desc: true
    }, function (err, obj) {
        if (!err) cache.writeInCache(req, obj);
        response.end(JSON.stringify(err ? err : obj));
    });
}

function getEvent(req, response) {
    meetup.getEvents({
        event_id: req.params.event_id
    }, function (err, obj) {
        if (!err) cache.writeInCache(req, obj);
        response.end(JSON.stringify(err ? err : obj));
    });
}

function getEventComments(req, response) {
    meetup.getEventComments({
        event_id: req.params.event_id
    }, function (err, obj) {
        if (!err) cache.writeInCache(req, obj);
        response.end(JSON.stringify(err ? err : obj));
    });
}

function getEventRatings(req, response) {
    meetup.getEventRatings({
        event_id: req.params.event_id
    }, function (err, obj) {
        console.log(obj);
        if (!err) cache.writeInCache(req, obj);
        response.end(JSON.stringify(err ? err : obj));
    });
}

function getEventAttendance(req, response) {
    meetup.getEventAttendance({
        urlname: config.urlname,
        id: req.params.event_id
    }, function (err, obj) {
        if (!err) cache.writeInCache(req, obj);
        response.end(JSON.stringify(err ? err : obj));
    });
}

function serverRunning(req, res) {
    res.json({status: 200});
}

app.get('/', oauth, serverRunning);
app.get('/group', cache.readFromCache, oauth, getGroup);
app.get('/events', cache.readFromCache, oauth, getEvents);
app.get('/event/:event_id', cache.readFromCache, oauth, getEvent);
app.get('/event/:event_id/comments', cache.readFromCache, oauth, getEventComments);
app.get('/event/:event_id/rating', cache.readFromCache, oauth, getEventRatings);
app.get('/event/:event_id/attendance', cache.readFromCache, oauth, getEventAttendance);