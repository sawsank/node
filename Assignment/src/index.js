import express from 'express';
import  mongoose  from 'mongoose';

let app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/assignment').then(() => {
    console.log('connected to mongodb');
}).catch((err) => {
    console.log('failed to connect');
});

let categorySchema = mongoose.Schema({
    name: String,
    status: String
});

let productSchema = mongoose.Schema({
    name: String,
    price: String,
    quantity: String,
    description: String
});

let Category = mongoose.model('Category',categorySchema);
let Product = mongoose.model('Product',productSchema);

app.get('/',(req,res)=>{
    Category.find({}).then((data) => {
        res.status(200).json({data});
    }).catch((err) => {
        res.status(500).json({err});
    })
})
app.get('/',(req,res)=>{
    Product.find({}).then((data) => {
        res.status(200).json({data});
    }).catch((err) => {
        res.status(500).json({err});
    })
})
app.post('/', (req,res)=>{
    const{name,status} = req.body;
    const category = new Category({name,status});
    category.save().then((data) => {
        res.status(200).json({data});
    }).catch((err)=>{
        req.status(500).json({err});
    })
})
app.post('/', (req,res)=>{
    const{name,price,quantity,description} = req.body;
    const product = new Product({name,price,quantity,description});
    product.save().then((data) => {
        res.status(200).json({data});
    }).catch((err)=>{
        req.status(500).json({err});
    })
})

app.listen(8080, ()=>{
    console.log("Server running at 8080");
})