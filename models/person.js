const mongoose=require('mongoose');

const personSchema=new mongoose.Schema({
  name:
  {
    type:String,
    required:true
  },
  age:
  {
    type:Number,
    required:false
  },
  work:
  {
    type:String,
    enum:['chef','waiter','manager'],
    required:true
  },
  mobile:
  {
    type:String,
    required:true
  },
  email:
  {
    type:String,
    required:true,
    unique:true
  },
  address:
  {
    type:String,

  },
  salary:
  {
    type:Number,
    required:true
  },
  username:{
    required:true,
    type:String
  },
  password:
  {
    required:true,
    type:String
  },

});

const person=mongoose.model('person',personSchema)
module.exports=person;