const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const authRoutes = require('./routes/authRoutes');
const app = express();
const cookieParser =require('cookie-parser');
const cors = require('cors');
const path = require('path');
const deezerRoutes = require('./routes/deezerRoutes');
const musicRoutes = require('./routes/musicRoutes');
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/deezer',deezerRoutes);
app.use('/api/auth',authRoutes)
app.use('/api/media',musicRoutes)
const port = process.env.PORT || 8080;


app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

const __name = path.resolve()

app.use(express.static(path.join(__name, "frontend","build")));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__name,"frontend","build","index.html"));
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDb connected successfully')
        app.listen(port,() => {
            console.log('Running on port: ' + port);
        })
    })


