console.clear();

var stream = Rx.Observable.fromArray([1,2,3,4]);

var stream2 = Rx.Observable.fromArray([5,6,7,8]);

var concat = Rx.Observable.concat( 
    stream,
    stream2
 );

 var merge = Rx.Observable.merge( 
    stream,
    stream2
 );

 concat.subscribe( function(val){
     console.log( val );
 });

 merge.subscribe( function(val){
     console.log( 'merge: ', val );
 })

 var combineLatest = Rx.Observable.combineLatest(
     stream,
     stream2
 );

 combineLatest.subscribe( function(val) {
     console.log( 'combine ', val )
 })
