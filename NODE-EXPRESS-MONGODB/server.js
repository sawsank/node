const express = require('express');
const cors = require('cors');

const app = express();
//app.use(...);

const db = require("./app/models");
db.mongoose
.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    console.log("connected to the database");
}).catch(err => {
    console.log("cannot connect to the database", err);
    process.exit();
});


var corsOption ={
    origin: 'https://localhost:8080'
};
app.use(cors(corsOption));

//parse request of context-type application/json
app.use(express.json());

//parse request of context-type application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//simple route
app.get('/',(req, res) =>{
    res.json({message: "welcome to the node rest api applocation"});
});

//set port, listen for request
const PORT = process.env.PORT ||8080;
require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
//const PORT = ...;
//app.listen(...);
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});