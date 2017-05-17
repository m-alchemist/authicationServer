// main statement

const express=require('express');
const http=require('http');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const app=express();
const router=require('./router');
const mongoose=require('mongoose');
const cors=require('cors');
//app setup
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
app.use(cors());
router(app);


//DB setup
mongoose.connect('mongodb://localhost:auth/auth')
//server setup
const port=process.env.PORT || 3090;

const server=http.createServer(app);
server.listen(port);
console.log('listening on port', port);
