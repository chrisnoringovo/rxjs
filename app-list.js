console.clear();

var source = Rx.Observable.fromArray([1,2,3,4,5]);

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


function Producer(){
    this.listeners = [];
}

Producer.prototype.add = function(listener){
    this.listeners.push( listener );
}

Producer.prototype.notify = function(message){
    this.listeners.forEach( function(listener){
        listener.update( message );
    })
}

var stream = new Rx.Observable(function(observer) {
    observer.onNext('message');
})

var stream = new Rx.Observable(function(observer){
   var producer = new Producer();
   producer.nextValue( function(val){
       observer.onNext( val );
   })
})

function Producer(){

}

Producer.prototype.nextValue = function(cb){
     setTimeout(function(){
         cb( 1 );
    },2000);
}

