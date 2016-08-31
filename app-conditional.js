console.clear();

var stream = Rx.Observable.fromArray([1,2,3,4]);

var evenStream = Rx.Observable.fromArray([2,4,8]);
var secondEvenStream = 
    Rx.Observable
    .interval(1000)
    .take(4)
    .filter(function(val){
        return val % 2 === 0;
    })
    .every(function(val){
        return val % 2 === 0;
    });


var every = stream.every( function(val){
    return val % 2 === 0;
});

every.subscribe( function(val){
    console.log('Every',val);
})

evenStream.subscribe( function(val){
    console.log('even stream',val);
})

secondEvenStream.subscribe( function(val){
    console.log('second even stream',val);
})




