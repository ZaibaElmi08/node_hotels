const mongoose=require('mongoose');

// const mongoURL='mongodb://localhost:27017/hotels'
const mongoURL='mongodb+srv://zaibaelmi:<Cottytrip@BB>@cluster0.hvedj.mongodb.net/';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db=mongoose.connection;

db.on('connected',()=>console.log('Connected to Mongodb server'));

db.on('disconnected',()=>console.log('MongoDB disconnected'));

module.exports=db