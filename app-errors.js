console.clear();

var errStream = Rx.Observable
.throw('AAA thump..');

var errStreamWithFlattenedData = Rx.Observable
.interval(500)
.take(3)
.flatMap( function(val){
    if( val === 1 ) {
        return Rx.Observable.throw('crashing');
    }
    else {
        return Rx.Observable.return(val);
    }
})

var normalStream = Rx.Observable.return('anything');

var handledErrorStream = Rx.Observable.onErrorResumeNext( errStream, normalStream, errStreamWithFlattenedData );
handledErrorStream.subscribe(function(err){
    console.log('error stream ignored', err);
}, function(err){
    console.log("error stream ignored, error",err);
}, function(){
    console.log("completion of error stream ignored");
})


var errStream2 = Rx.Observable
.interval(200)
.take(3)
.select(function(val){
    if(val === 0) {
        return Rx.Observable.throw('Error stream');
    } else {
        return Rx.Observable.of(val);
    }
})
.select(function(observable){
    return observable.catch(Rx.Observable.return('Error handled'));
})
.selectMany( function(x){
    return x;
});


var stream = Rx.Observable.create(function(observer){
    observer.onNext(1); 
})

var stream2 = Rx.Observable
.interval(500)
.take(5)
.select( function(val){
    if(val === 3) {
        return Rx.Observable.throw('Oh no, not 3');
    } else {
        return Rx.Observable.of(val);
    }
})
.select( function(observer){
    return observer.catch(Rx.Observable.return('N/A'));
})
.selectMany( function(x){
    return x;
});

stream2.subscribe( function(val){
    console.log('Error handling II', val);
})

var merged = Rx.Observable
.merge( errStream2, stream )


merged.subscribe( function(val){
    console.log('Val', val);
}, function(err){
    console.log('Err', err);
}, function(){
    console.log('completed');
})