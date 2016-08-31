console.clear();

var onNext = Rx.ReactiveTest.onNext;
var scheduler = new Rx.TestScheduler();
var subject = scheduler.createColdObservable(
    onNext(100,'first'),
    onNext(200,'second')
);

var result;

subject.subscribe((val) => {
    result = val;
});

scheduler.advanceBy( 100 );

console.log('Should equal', result === 'first');

scheduler.advanceBy( 100 );

console.log('Should equal', result === 'second');






var testScheduler = new Rx.TestScheduler();

var stream = Rx.Observable.interval(1000, testScheduler)
.take(5)
.map((val) => {
    return val + 1
})
.filter((i) => {
    return i % 2 === 0
});


var result;
stream.subscribe((val) => result = val );

console.log('testing function');
testScheduler.advanceBy(1000);
testScheduler.advanceBy(1000);
testScheduler.advanceBy(1000);
console.log('Should equal', result === 2);
testScheduler.advanceBy(1000);
testScheduler.advanceBy(1000);
console.log('Should equal', result === 4);





