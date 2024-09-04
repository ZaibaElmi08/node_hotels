const mongoose=require('mongoose');
require('dotenv').config();
// const MONGODB_URL_LOCAL=process.env.MONGODB_URL_LOCAL;
const mongoURL=process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db=mongoose.connection;

db.on('connected',()=>console.log('Connected to Mongodb server'));

db.on('disconnected',()=>console.log('MongoDB disconnected'));

module.exports=db