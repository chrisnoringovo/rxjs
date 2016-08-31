var subject = new Rx.Subject();


var source = Rx.Observable.interval(500).take(3);

source.subscribe( subject );

subject.subscribe((val) => {
    console.log('Subject', val);
});

subject.onNext('Mess1');
subject.onNext('Mess2');



setTimeout(function() {
    subject.onCompleted();
}, 1600);


var subject = Rx.ReplaySubject();
subject.onNext(1);

subject.subscribe((val) = > {
    console.log('Replay', val);
})

subject.onNext(2);
subject.onNext(3);


