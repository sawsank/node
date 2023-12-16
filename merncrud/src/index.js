import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

let app = express();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/merncrud').then(()=>{
    console.log('connected to mongodb');
}).catch((err)=>{
    console.log('failed to connect', err);
});

let userSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

let User = mongoose.model('User', userSchema);

app.get('/', (req,res)=>{
    User.find({}).then((data) => {
        res.status(200).json({data});
    }).catch((err)=> {
        res.status(500).json({err})
    });
})

app.post('/', (req,res)=>{
    const {name,email,phone} =req.body;
    const user = new User({name,email,phone});
    user.save().then((data)=>{
        res.status(200).json({data});

    }).catch((err)=>{
        req.status(500).json({err});
    })
})

app.listen(8080, ()=> {
    console.log("server running at 8080")
})
