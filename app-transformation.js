console.clear();

var numbers = Rx.Observable.interval(1000);

var bufferBy = Rx.Observable.fromEvent(document,'click');

var buffered = numbers.buffer( bufferBy );

buffered.subscribe(function(values){
    console.log('Buffered',values);
});


var bufferTime = numbers.bufferTime(2000);
bufferTime.subscribe(function(values){
    console.log("Buffer time",values);
})

var expand = Rx.Observable
.of(2)
.expand(function(val){
    return Rx.Observable.of(1 + val);
})
.take(3);

expand.subscribe(function(val){
    console.log('Expand',val);
})


var scanning = Rx.Observable
.of({ prop : 'a'}, { prop2 : 'b'})
.scan((acc, curr) => Object.assign({}, acc, curr), {});

scanning.subscribe( function(val){
    console.log( val );
});

var sum = Rx.Observable
.of(1,2,3)
.do(function(){
    console.log('Create side effects');
})
.scan(function(acc,curr) { 
    console.log('Curr', curr);
    return acc + curr; 
})


sum.subscribe( function(val){
    console.log('Scanning', val);
})


var breakCondition = Rx.Observable.fromEvent(document,'click');
var source = breakCondition.switchMap( function(val){
    return Rx.Observable.interval(3000).take(1)
    .flatMap(function(){
        return Rx.DOM.getJSON( 'data3.json' );
    });
})

source.subscribe( function(val){
    console.log('Switch map', val);
})

var timingBreakCondition = Rx.Observable.interval(3000);

var sourceTiming = timingBreakCondition.switchMap( function(val){
    return Rx.Observable.interval(1000).map(function(val){
        return 'Emitting' + (val + 1);
    });
});

sourceTiming.subscribe(function(val){
    console.log('Switch map timer', val);
});

var input = document.getElementById('data');

flatmapExample = Rx.Observable.fromEvent(input,'keyup')
.map( function(ev){
    return ev.target.value;
})
.filter(function(text){
    return text.length >=3;
})
.distinctUntilChanged()
.flatMap( function(val){
    return Rx.DOM.getJSON( 'data3.json' );
})

flatmapExample.subscribe( function(result){
    console.log('Flatmap', result);
})