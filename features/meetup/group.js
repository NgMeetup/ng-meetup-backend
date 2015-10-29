var route = require('../../config/route.js');
var functions = require('../../config/functions.js');
var api = require('../../config/api.js');

var u = require("underscore");
var request = require('request');

var group = {};

group.getGroup = function (req, res) {
    var _reqParams = {
        group_urlname: api.groupUrl
    };

    request
        .get(functions.meetupUrl('group', _reqParams),
        function (error, response, body) {
            res.json(JSON.parse(body));
        });
};

group.getGroupComments = function (req, res) {
    var _reqParams = {
        group_urlname: api.groupUrl
    };

    request
        .get(functions.meetupUrl('group_comments', _reqParams),
        function (error, response, body) {
            res.json(JSON.parse(body));
        });
};

group.getGroupMembers = function (req, res) {
    var _members = {results: []};
    var _page = 0;

    getMembers(_page);

    function getMembers(page) {
        var _reqParams = {
            group_urlname: api.groupUrl,
            offset: page,
            omit: [
                'topics',
                'self',
                'visited',
                'lon',
                'lat',
                'hometown',
                'other_services',
                'state',
                'joined',
                'country',
                'status'
            ]
        };

        request
            .get(functions.meetupUrl('group_members', _reqParams),
            function (error, response, body) {
                var _body = JSON.parse(body);
                if (_members.results.length < _body.meta.total_count) {
                    _members.results = _members.results.concat(_body.results);
                    getMembers(++page);
                } else {
                    res.json(_members);
                }
            });
    }

};

route.get('/group', group.getGroup);
route.get('/group/comments', group.getGroupComments);
route.get('/group/members', group.getGroupMembers);
