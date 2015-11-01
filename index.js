var app = require('./app'),
    http = require('http').Server(app);

require('./meetup');

http.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");