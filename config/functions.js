var u = require("underscore");
var md5 = require('md5');
var api = require('./api.js');

var functions = {};

functions.md5 = function (element) {
    if (u.isObject(element)) {
        var object = {};
        u.each(element, function (el, key) {
            object[key] = key === 'password' ? md5(el) : el;
        });
        return object;
    } else {
        return md5(element);
    }
};

functions.checkObjectFields = function (object, fields) {
    var returnObject = {};
    fields.forEach(function (val) {
        returnObject[val] = u.isUndefined(object[val]) ? '' : object[val];
    });
    return returnObject;
};

functions.checkArrayFields = function (array, fields) {
    var returnArray = [];

    array.forEach(function (val) {
        var resp = functions.checkObjectFields(val, fields);
        if (u.isObject(resp)) {
            returnArray.push(resp);
        }
    });

    return returnArray;
};

functions.prepareResponse = function (error, msg, data) {
    var response = {
        error: error,
        msg: msg
    };

    if (!u.isUndefined(data)) {
        response.data = data;
    }

    return response;
};

functions.easyRes = function (err, result, msg, items) {
    if (!err && result) {
        return functions.prepareResponse(false, msg[0], items);
    } else {
        return functions.prepareResponse(true, msg[1]);
    }
};

functions.applyRegex = function (element, regex, key) {
    if (u.isObject(element)) {
        element = element[key]
    }

    return new RegExp(element, regex);
};

functions.urlParams = function (base, params) {
    var url = base;
    if (u.isObject(params)) {
        url += '&';
        u.each(params, function (el, key) {
            url += '&' + key + '=' + el;
        });

        url = url.replace('&&', '?');
    }

    return url;
};

functions.objectsToArray = function (array, key) {
    var _array = [];

    array.forEach(function (object) {
        _array.push(object[key]);
    });

    return _array;
};

functions.meetupUrl = function (action, params, urlParams) {
    var actionPaths = {
        group: '2/groups',
        group_comments: 'comments',
        group_members: '2/members',
        events: '2/events',
        event_comments: '/2/event_comments',
        event_ratings: '/2/event_ratings',
        event_attendance: '/:urlname/events/:id/attendance'
    };

    var _actionPath = actionPaths[action];
    var _key = (u.isObject(params) ? '&key=' : '?key=') + api.key;

    if (!u.isUndefined(urlParams)) {
        u.each(urlParams, function (el, key) {
            _actionPath = _actionPath.replace(':' + key, el);
        });
    }

    return functions.urlParams(api.baseUrl + _actionPath, params) + _key;
};

module.exports = functions;