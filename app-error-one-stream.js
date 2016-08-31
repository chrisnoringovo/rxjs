console.clear();

// crashed on 2, doesn't recover'
var errorInterval = Rx.Observable.interval(500)
.take(4)
.flatMap(function(val){
    if(val === 2) {
        return Rx.Observable.throw('Crashing on 2');
    } else {
        return Rx.Observable.of(val);
    }
});

// crashes but recovers as we append a catch to an observer and maps it to an error message
var errorIntervalErrorRecovery = Rx.Observable.interval(500)
.take(4)
.map(function(val){
    if(val === 2) {
        return Rx.Observable.throw('Crashing on 2');
    } else {
        return Rx.Observable.of(val);
    }
})
.flatMap(function(observer){
    return observer.catch( Rx.Observable.of('Error occured'));
});

errorIntervalErrorRecovery.subscribe( function(val){
    console.log('Interval recovery success', val);
}, function(err){
    console.log('Interval recovery error', err);
}, function(){
    console.log('Interval recovery completed');
})

errorInterval.subscribe( function(val){
    console.log('Interval', val);
}, function(err){
    console.log('Intervall error',err);
}, function(){
    console.log('Interval completed');
})

// errorCallback is called
var errorStream = Rx.Observable
.throw('error');

// rewriting it to 'good' observable, success and completed called
var caughtError = errorStream
.catch(function(err){
    return Rx.Observable.of('Catch: ' + err);
})

caughtError.subscribe( function(caught){
    console.log('Caught success', caught);
}, function(err){

},
function(){
    console.log('Caught completed');
})

errorStream.subscribe(function(val){
    console.log('success', val);
}, function(err){
    console.log('Error',err);
}, function(){
    console.log('completed');
})

