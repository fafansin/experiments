const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser:true, useUnifiedTopology:true})
    .then(ref=>{
        console.log('Mongodb Connection Success');
    })
    .catch(e => {
        console.log('Mongodb Connection Failed');
        console.log(e);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));

app.get('/products', async (req, res)=>{
    const products = await Product.find({});
    res.render('products/index', {products});
})

app.get('/products/:id', async(req, res) =>{
    const product = await Product.findById(req.params.id);
    res.render('products/show', {product});
})
app.get('/', (req, res) =>{
    res.render('index');
})
app.listen(3000, ()=>{
    console.log('Experiments Activated at port',  3000);
}) 