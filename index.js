const express = require('express');
const app = express();
const port = 3000;

const {User}= require("./models/User");
const bodyParser = require('body-parser');
const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    // useCreateIndex: true, 
    // useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err,userInfo)=>{ //save 는 몽고디비에 있는 함수   
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})