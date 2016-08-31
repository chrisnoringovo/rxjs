var stream = Rx.DOM.get('/products.json').retry(5);

stream.subscribe((val) => {
    console.log('Data', val);
}, err => console.log(err));