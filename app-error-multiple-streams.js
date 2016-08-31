console.clear();

var goodStream = Rx.Observable.interval(500).take(3);

var otherGoodStream = Rx.Observable.create(function(observer){
    observer.onNext(77);
    observer.onCompleted();
});

// badStream with and without fixing..
var badStream = Rx.Observable.throw('I shall crash you all')
//.catch(function(err){
//    return Rx.Observable.of(err);
//});

var badStreamMultiValues = Rx.Observable
.interval(20)
.take(5)
.map( function(val){
    if(val === 3) {
        return Rx.Observable.throw( 'Crashes on 3' );
    } else {

        return Rx.Observable.of('Bad stream success ' + val);
    }
})
.flatMap(function(observer){
    return observer.catch(Rx.Observable.of('Recovery'));
})

var merged = Rx.Observable.merge( badStream, goodStream, otherGoodStream  );

merged.subscribe( function(val){
    console.log('Merged success', val);
}, function(err){
    console.log('Merged error', err);
}, function(){
    console.log('Merged completed');
});

var streamSurviving = Rx.Observable.onErrorResumeNext( goodStream, otherGoodStream, badStream, badStreamMultiValues );

streamSurviving.subscribe( function(val){
    console.log('Stream surviving success', val);
}, function(err){
    console.log('Stream surviving error', err);
}, function(){
    console.log('Stream surviving completed');
});



