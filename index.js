var route = require('./config/route.js');
var io = require('./config/server.js');
var f = require('./config/functions.js');
var request = require('request');


require('./features/meetup/event.js');
require('./features/meetup/group.js');

route.get('/', function (req, res) {
    res.json({'status': 'running'});
});
