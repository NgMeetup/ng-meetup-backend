var route = require('../config/route.js');
var functions = require('../config/functions.js');
var db = require('../config/db.js');
var api = require('../config/api.js');

var u = require("underscore");
var request = require('request');

var push = {};

push.sendPush = function (req, res) {
    var pushInfo = functions.checkObjectFields(req.body, ['system', 'title', 'subtitle', 'message']);
    var systenFile;
    if (pushInfo.system != '') {
        if (pushInfo.system == 'ios') {
            systenFile = 'ios_push.php';
        } else {
            systenFile = 'android_push.php';
        }

        var pushData = {
            content: pushInfo,
            regid: []
        };
        db.collection('regid').find({}).toArray(function (err, items) {
            if (!err && items.length) {

                var _regid = functions.checkArrayFields(items, ['regid']);
                pushData.regid = functions.objectsToArray(_regid, 'regid');

                request
                    .post(api.push + systenFile, {form: pushData}, function (err, httpResponse, body) {
                        res.json({error: false, msg: "push_send"});
                    });
            } else {
                res.json({error: true, msg: "db_error"});
            }
        });
    } else {
        res.json({error: true, msg: "missing_params"});
    }


};

push.sendPushTo = function (req, res) {
    var pushTo = req.params.regid;

    //res.json();
};

push.addRegid = function (req, res) {
    var regid = {regid: req.body.regid};

    if (regid.regid != '') {
        db.collection('regid').save(regid, function (err, result) {
            res.json(functions.easyRes(err, result, ['insert_success', 'insert_error']));
        });
    } else {
        res.json({error: true, msg: 'missing_regid'});
    }
};

route.post('/push/send', push.sendPush);
route.post('/push/send/:regid', push.sendPushTo);
route.post('/push/add', push.addRegid);