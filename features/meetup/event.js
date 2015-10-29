var route = require('../../config/route.js');
var functions = require('../../config/functions.js');
var api = require('../../config/api.js');

var u = require("underscore");
var request = require('request');

var event = {};

event.getEvents = function (req, res) {
    var _reqParams = {
        offset: req.params.page,
        format: 'json',
        group_urlname: api.groupUrl,
        page: 20,
        order: 'time',
        desc: true,
        status: ['upcoming', 'past']
    };

    request
        .get(functions.meetupUrl('events', _reqParams),
        function (error, response, body) {
            res.json(JSON.parse(body));
        });
};

event.getEventByID = function (req, res) {
    var _reqParams = {
        event_id: req.params.event_id,
        format: 'json'
    };

    request
        .get(functions.meetupUrl('events', _reqParams),
        function (error, response, body) {
            res.json(JSON.parse(body));
        });
};

event.getEventComments = function (req, res) {
    var _reqParams = {
        event_id: req.params.event_id
    };

    request
        .get(functions.meetupUrl('event_comments', _reqParams),
        function (error, response, body) {
            res.json(JSON.parse(body));
        });
};

event.getEventRatings = function (req, res) {
    var _reqParams = {
        event_id: req.params.event_id
    };

    request
        .get(functions.meetupUrl('event_ratings', _reqParams),
        function (error, response, body) {
            res.json(JSON.parse(body));
        });
};

event.getEventAttendance = function (req, res) {
    var _reqParams = {
        event_id: req.params.event_id
    };

    var _urlParams = {
        urlname: api.groupUrl,
        id: req.params.event_id
    };

    request
        .get(functions.meetupUrl('event_attendance', _reqParams, _urlParams),
        function (error, response, body) {
            res.json(JSON.parse(body));
        });
};

route.get('/events/:page', event.getEvents);

route.get('/event/:event_id', event.getEventByID);
route.get('/event/:event_id/comments', event.getEventComments);
route.get('/event/:event_id/ratings', event.getEventRatings);
route.get('/event/:event_id/attendance', event.getEventAttendance);
