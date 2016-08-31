console.clear();

var stream = Rx.Observable.fromArray([1,2,3,4,5]);

var now = Date.now();

stream.subscribe(
(val) => {
    console.log('Current thread', val);
}, 
err => {},
() => {
    var done = Date.now();
    console.log( (done - now) + "ms" );
})

console.log('current');


var defaultStream = Rx.Observable.from([1,2,3,4,5],null,null, Rx.Scheduler.default);
defaultStream.subscribe((val) => {
   console.log('Default', val); 
},
err => {},
() => {
    var done = Date.now();
    console.log( "default " + (done - now) + "ms" );
})

console.log('default');


var merged = Rx.Observable.merge(
    Rx.Observable.create((observer) => {
        setTimeout(function() {
            observer.onNext( 1 );
            observer.onCompleted();
        }, 4000);
    }).observeOn( Rx.Scheduler.default ),
    Rx.Observable.of(2)
);

var old = Date.now();

merged.subscribe((val) =>{
    console.log('Merged',val );
}, () => {},
() => {
     console.log('Merged completed', (Date.now() - old) + 'ms ' );
})
