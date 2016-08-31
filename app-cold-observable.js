console.clear();

// not sharing, they all work against unique instances
/*
var cold = Rx.Observable.interval(500).take(10);

cold.subscribe( function(i) { console.log(i); } )

setTimeout( function(){ 
    cold.subscribe( function(j){ 
        console.log(' second subscriber' + j); 
    }) 
}, 4000 );
*/

// sharing the data
var cold = Rx.Observable.interval(500).take(10).publish().refCount();

cold.subscribe( function(i) { console.log(i); } )

setTimeout( function(){ 
    cold.subscribe( function(j){ 
        console.log(' second subscriber' + j); 
    }) 
}, 4000 );


