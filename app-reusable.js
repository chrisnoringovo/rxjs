console.clear();

var source = Rx.Observable.interval(500).take(6);

source
    .filter(function(item){
        return item % 2 === 1;
    })
    .map(function(item){
        return item + 'X';
    })
    .forEach(function(item){
        console.log( item );
    })

source.subscribe(function(item){
    console.log('next item', item);
});    