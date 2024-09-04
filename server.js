

// var add=function(a,b)
// {
//   return a+b;
// }
// var add=function(a,b)
// {
//   return a +b;
// }
// var add=(a,b)=>a-b;
// var result=add(6,5);
// console.log(result);

const { notDeepEqual } = require("assert")

// (function(){
//   console.log('zaiba');
// })();

// function callback()
// {
//   console.log("zaiba is calling a callback function");
// }

// const add=function(a,b,callback)
// {
//   var result=a+b;
//   console.log(result);
//   callback()
// }
// add(3,41234,callback);

// var fs=require('fs');
// var os=require('os');

// var user=os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt','Hi'+user.username+'!',()=>console.log("file is created"));

// console.log(os);
// console.log(fs);

// const notes=require('./notes .js');
// var _=require('lodash');

// // var age=notes.age;
// // console.log('server file is available');

// // var result=notes.addnumber(100,age+1);
// // console.log(result);
// // console.log(age);

// var data=["person","person",1,2,1,2,'name','age',2];
// var filter=_.uniq(data);
// console.log(filter);

// console.log(_.isString(0));

// var os=require('os');
// console.log(os.hostname());

// const jsonString='{"name":"john","age":21,"city":"New York"}';
// const jsonObject=JSON.parse(jsonString);
// console.log(jsonObject);

// const objectToConvert={
//   name:"Zaiba",
//   age:25
// }
// const json=JSON.stringify(objectToConvert);
// console.log(json)


// const express=require('express')
// const app=express()

// app.get('/',function(req,res){
// res.send('Hello World')
// })
// app.listen(3000)

const express=require('express')
const app=express();
const db=require('./db');
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT || 3000;
const person=require('./models/person');
const menuItem=require('./models/menuItem');
app.get('/',function(req,res)
{
  res.send("Welcom To My Hotel...How Can I Help You?,We have list of menu ")
})

// app.get('/zaiba',function(req,res){
//     res.send("how are yiu doing")
// })
// app.get('/idli',(req,res)=>
// {
//   var customized_id={
//     name:'rava idli',
//     size:'10',
//     sambhar:'true',
//     chutney:'false',
//   }
//   res.send(customized_id);
// })
// app.post('/items',(req,res)=>{
//   res.send("data is saved")
// })
// app.get('/vishnu',function(req,res){
//   res.send("I am fine")
// })
app.post('/person',async(req,res)=>{
  try
  {
    const data=req.body

    const newPerson=new person(data);

    const response=await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err)
  {
     console.log(err);
     res.status(500).json({error:'Internal Server Error'});
  }
  // const data=req.body;

  // const newPerson=new person(data);
  // // newPerson.name=data.name;
  // // newPerson.age=data.age;
  // // newPerson.work=data.work;
  // // newPerson.mobile=data.mobile;
  // // newPerson.email=date.email;
  // // newPerson.address=data.address;
  // // newPerson.salary=data.salary;

  // newPerson.save((error,savedPerson)=>{
  //   if(error)
  //   {
  //     console.log('Error saving person',error);
  //     res.status(500).json({error:'Internal Server Error'})
  //   }
  //   else
  //   {
  //         console.log('data saved successfully');
  //         res.status(200).json(savedPerson);
  //   }
  // })
})

app.get('/person',async(req,res)=>
{
  try
  {
    const data=await person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch(err)
  {
    console.log(err);
     res.status(500).json({error:'Internal Server Error'});
  }
})

app.post('/menu',async(req,res)=>{
  try
  {
    const data=req.body

    const newmenu=new menuItem(data);

    const response=await newmenu.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err)
  {
     console.log(err);
     res.status(500).json({error:'Internal Server Error'});
  }
})

// mongoose.connect(mongoURL, {
//   serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
// });

app.get('/menu',async(req,res)=>
  {
    try
    {
      const data=await menuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    }
    catch(err)
    {
      console.log(err);
       res.status(500).json({error:'Internal Server Error'});
    }
  })

app.get('/person/:workType',async(req,res)=>
{
  try{
  const workType=req.params.workType;
  if(workType=='chef'||workType=='manager'||workType=='waiter')
  {
    const response=await person.find({work:workType});
    console.log('response fetched');
    res.status(200).json(response);
  }
  else
  {
    res.status(404).json({error:'Invalid work type'})
  }
}
catch(err)
{
  console.log(err);
  res.status(500).json({error:'Internal Server Error'});
}
})

const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);


const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);



app.listen(PORT,()=>
{
  console.log('listening on port')
})
