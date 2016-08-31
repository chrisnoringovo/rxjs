var button = document.getElementById('btn');
var source1 = Rx.DOM.getJSON( 'data.json' ).flatMap(Rx.Observable.fromArray).pluck('name');
var source2 = Rx.DOM.getJSON( 'data2.json' ).flatMap(Rx.Observable.fromArray).pluck('props','name');
var sourceData = Rx.DOM.getJSON( 'data3.json' );
var source3 = Rx.Observable.fromArray([{ 'name': 'test'},{'name' : 'test2'}, { 'name' : 'test' }]); 
var source4 = Rx.Observable.fromArray(['test3','test4']);

console.clear();

var clicks = Rx.Observable.fromEvent(button, 'click');

clicks
.debounce( 2000 )
.flatMap(getData())
.subscribe(function(data){
    
    console.log( data );
});

function getData() {
    console.log('clicked...', new Date().getTime());

    return sourceData
    .flatMap(Rx.Observable.fromArray)
    .pluck('name')
    .take(2);
}

/*
var test2 = function (amount) { 
                return source1
                .merge( source2 )
            }
test2(2).subscribe( function(data) {
    console.log( data );
}, function(err) {
    console.log(err);
},
function() {
    console.log('done');
})

// can I take the answer, turn it into an array, perform map on it
var array = sourceData.flatMap(function(data){
    return Rx.Observable.fromArray(data).pluck('name');
});

array.subscribe(function (data) {
    console.log( data );
})

            

var test = source3
    .map(function(item) {
        return item.name;
    })
    .distinct();

test.subscribe( function(data) {
    console.log( data );
})

*/

/*
function getResults( amount ) {
    return source4.merge( source3 )
           .flatMap( function(array) { 
                return Rx.Observable.from( array ); 
            })
           //.distinct()
           .take(amount)
}

var clicks = Rx.Observable.fromEvent(button, 'click');

clicks.debounce( 1000 )
    .flatMap( getResults(5) )
    .subscribe( function(value){
        console.log( 'received value', value );
    },
    function(err) {
        console.error( err );
    },
    function() {
        console.log( 'All values retrieved' );
    })

    */