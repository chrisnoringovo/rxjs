console.clear();

var stream = Rx.Observable.interval(200)
.filter(function(val){
    return val > 2
})
.take( 3 );

var button = document.getElementById('btn');

var debounceTime = Rx.Observable
.fromEvent(button,'click')

.debounce(2000);

debounceTime.subscribe( function(){
    console.log('mouse pressed');
})


var debouncedStream = Rx.Observable.fromArray([1,2]).debounce(25);

debouncedStream.subscribe( function(val){
    console.log('debounce stream', val );
});


stream.subscribe( function(val){
    console.log('filter', val );
});

var numbers = Rx.Observable
.interval(100)
.filter( function(val){  return val % 2 === 0 } )
.take(5);

numbers.subscribe( function(val){  
    console.log('Numbers', val);  
})

var mousePressedTimer = Rx.Observable.interval(1000);
var button = document.getElementById('btn');

var mouseUp = Rx.Observable.fromEvent(button,'mouseup');
var whenHit20 = Rx.Observable.interval(200).filter( function(item){ return item === 20 });

mousePressedTimer
.takeUntil( mouseUp )
.subscribe( function(val){
    console.log('mouse up has NOT happened yet',val);
}, function(err){},
 function(){
     console.log('condition fulfilled');
 })

 var throttle = Rx.Observable
 .interval(1000)
 .throttle(2000);

 throttle.subscribe( function(val){
     console.log('Throttle', val );
 });

