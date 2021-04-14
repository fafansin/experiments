const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect('mongodb://localhost:27017/demo')
    .then(ref=>{
        console.log('Mongodb Connection Success');
    })
    .catch(e => {
        console.log('Mongodb Connection Failed');
        console.log(e);
    })

const categories = ['fruit', 'vegetables', 'dairy'];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/products', async (req, res)=>{
    const products = await Product.find({});
    res.render('products/index', {products});
})
app.get('/products/new', (req, res) =>{
    res.render('products/new', {categories});
})

app.post('/products', async (req, res) =>{
    const ref = await Product.create(req.body);
    res.redirect('/products');
})
app.get('/products/:id', async(req, res) =>{
    const product = await Product.findById(req.params.id);
    res.render('products/show', {product});
})
app.get('/products/:id/edit', async(req, res) =>{
    const product = await Product.findById(req.params.id);
    res.render('products/edit', {product, categories});
})
app.delete('/products/:id', async (req, res) =>{
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    console.log(product);
    res.redirect('/products');
})
app.put('/products/:id', async (req, res) =>{
    const { id } = req.params;
    const { price, name, category } = req.body;
    const product = await Product.findByIdAndUpdate(id, {name: name, category:category, price:price}, {new:true, rundValidators:true})
    res.redirect(`/products/${id}`);
})


app.get('/', (req, res) =>{
    res.render('index');
})
app.listen(3000, ()=>{
    console.log('Experiments Activated at port',  3000);
}) 