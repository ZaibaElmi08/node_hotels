const express=require('express');
const router=express.Router();
const menuItem=require('./../models/menuItem');

router.post('/menu',async(req,res)=>{
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
router.get('/',async(req,res)=>
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
  module.exports=router;