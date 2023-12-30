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

app.get('/id', (req,res)=>{
    let id = req.params.id;
    User.findById(id).then((data) => {
        res.status(200).json({data});
    }).catch((e)=> {
        console.log(e);
})
});

app.put('/:id', async(req,res)=>{
    let userId= req.params.id
    await User.findByIdAndUpdate(userId,{...req.body})
    res.send("success")
})  ;
app.post('/', (req,res)=>{
    //const {name,email,phone} =req.body;
    const user = new User({...req.body});
    ///const user = new User({name,email,phone});
    user.save().then((data)=>{
        res.status(200).json({data});

    }).catch((err)=>{
        req.status(500).json({err});
    })
})

app.delete('/:id', (req,res)=>{
    let userId = req.params.id
    //console.log(userId)
    //res.send(userId);
    User.findByIdAndDelete(userId).then((data)=>{
        res.status(200).json({data});
    }).catch((err)=>{
        res.status(500).json({err});
    })
})

app.listen(8080, ()=>{
    console.log("server running at 8080");
})
// app.listen(8080, ()=> {
//     console.log("server running at 8080");
// })
