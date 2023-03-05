const express = require ('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const auth = require('./routes/auth')
const user = require('./routes/users')
const postRoute = require('./routes/posts')
const categoriesRoute = require('./routes/categories')


dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}).then(()=>{
    console.log("connected");
}).catch(err=>{
    console.log("Not connected");
});

app.use('/api/auth',auth);

app.use('/api/users',user);

app.use('/api/posts',postRoute);

app.use('/api/categories',categoriesRoute);






app.listen(3000,()=>{
    console.log('listening to port 3000');
});