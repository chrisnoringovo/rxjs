console.clear();

var stream = Rx.Observable.interval(1000)
.publish();

stream.subscribe(function(val){
    console.log('Subscriber 1', val);
});



setTimeout(function() {
    stream.connect();

    
}, 2000);

setTimeout(function() {
    stream.subscribe(function(val){
        console.log('Started after 4 sec, Subscriber 2', val);
    });
}, 4000);