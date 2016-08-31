console.clear();

var range = Rx.Observable.range(0,5).skip(1);
var newList = Rx.Observable.fromArray([3,4,5]);

var zipped = Rx.Observable.zip( range, newList ).throttle(2000);
zipped.subscribe( function(val){
    console.log('Zipped ',val);
})

range.subscribe(function(val){ 
    console.log(val); 
})

var stream= Rx.Observable
    .fromArray([1,2,3,4])
    .take(2)
    .flatMap(function(val){
        return Rx.Observable.interval(500).take(1).map(function(){
            return val;
        });
    });


stream.subscribe(function(val){
    console.log( val );
});


var source = Rx.DOM.getJSON( 'data2.json' )
.flatMap( function(data) {
    return Rx.Observable.fromArray( data ).pluck('props','name');
} );
source.subscribe( function(data){
    console.log( data );
})
