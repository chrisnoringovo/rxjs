console.clear();

var source = Rx.Observable.create(function(observer){
    var i=0;
    var id = setTimeout(function() {
        try {
            throw 'Break stuff'

            console.log('timeout', i);
            observer.onNext( i++ );
            observer.onCompleted(); 
        } catch (error) {
            observer.onError( error );
        }
    }, 1000);
    
    return function(){
        console.log('I am the dispose function');
        clearTimeout( id );
    }
});

var sub = source.subscribe(function(x){
    console.log('next ' + x);
},
function(err){
    console.error(err);
}, function(){
    console.info('done');
})

//setTimeout(function(){
//    sub.dispose(); 
//}, 500)