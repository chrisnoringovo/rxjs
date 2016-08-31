console.clear();

var stream = Rx.Observable.of(1,2,3,4,5);

var subscription = stream
.do(function(val){
    console.log('Current val', val);
})
.filter(function(val){
    return val % 2 === 0;
});

subscription.subscribe(function(val){
    console.log('Val',val);
})


stream
.filter(function(val){
    return val % 2 === 0;
})
.toPromise()
.then( function(val){
    console.log('Promise', val);
});


stream
.let( observable => 
        observable
        .filter(function(x){
            return x % 2 > 0;
        }))
        .take(2)
.subscribe(function(val){
    console.log('let', val);
})

var time = new Date().getTime();

stream
.delay(1000)
.subscribe( (val) => {
    var newTime = new Date().getTime();
    console.log('Delayed', val + " " + (newTime - time));
})

Rx.Observable.merge(
    Rx.Observable.of('Marco').delay(1000),
    Rx.Observable.of('Polo').delay(2000)
).subscribe((val) => {
    var newTime = new Date().getTime();
    console.log('Merged Delay', val + " " + (newTime - time));
})