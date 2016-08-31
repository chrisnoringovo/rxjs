console.clear();
/*
var source = Rx.Observable
            .interval(500)
            .take(5)
            .map( function(x) {
                return Rx.Observable.timer(500).map(function() {
                    return x;
                });
            })
            .mergeAll();

source.subscribe(function(x) {
    console.log( x.toString() );
})

*/            


// version 2

var source = Rx.Observable
            .interval(500)
            .take(5)
            .flatMap( function(x) {
                return Rx.Observable.timer(500).map(function() {
                    return x;
                });
            })
            
source.subscribe(function(x) {
    console.log( x.toString() );
})          
