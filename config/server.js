var app = require('./route.js');
var http = require('http').Server(app);

http.listen(4000, function () {
    console.log("Connected & Listen to port 4000");
});
