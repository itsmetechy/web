var events = require('events');


var eventEmitter = new events.EventEmitter();

var connectHandler = function connected () {

    console.time('Starts');

    var buf = new Buffer('Simply Easy Learning');
    console.log(buf);
    var json = buf.toJSON(buf);
    console.log(json);


    console.log(buf.toString());

    console.timeEnd('Starts');
    eventEmitter.emit('data-received');
}

eventEmitter.on('connection', connectHandler);

eventEmitter.on('data-received', function () {
    console.log('Second')
});


eventEmitter.emit('connection');

