const express=require('express');
const port=8001;
const path=require('path');
const bodyParser=require('body-parser');
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.set('views',path.join(__dirname,'views'))
 app.use (express.urlencoded());
 app.use(express.static('assets'))
 
var contactList=[
   { name:"palak",
    phone:'7722941183'
   },
    {
       name:"tony stark",
       phone:'8877323818'
    },
    {
       name:"coding ninja",
       phone:"11111111111"
    }
   ]


app.get('/',function(req,res)
{   console.log(__dirname);
   Contact.find({},function(err,contacts)
   {
      if(err)
      {
         console.log("Error in fetching data from db");
         return ;
      }
      return  res.render('home',
      {title:"my contact list",contact_list: contacts});
   });
   
    
});
app.get('/practice',function(req,res)
{   console.log(__dirname);
   return  res.render('practice',{title:"let us practice ejs" });
    
});

app.post('/create-contact',function(req,res){
     
   //  contactList.push({
   //    name:req.body.name,
   //    phone:req.body.phone
   //  });
   // contactList.push(req.body);
   console.log(req.body);
   console.log(req.body.my_name);
   console.log(req.body.my_phone);
        Contact.create({
         name:req.body.my_name,
         phone:req.body.my_phone
         
         
        },function(err,newContact)
        { 
         if(err)
         {
            console.log("error in creating the contact");
            console.log(err);
            return ;
         }
             console.log("********",newContact);
             return res.redirect('back');
        });
     // return res.redirect('back');
       
});


app.get('/delete-contact/',function(req,res)
{  //console.log(req.query);
   let id=req.query.id;
   Contact.findByIdAndDelete(id,function(err)
   {
      if(err)
      {
         console.log("Error in deleting the contact");
         return ;
      } 
      return res.redirect('back');
   });
  
   
} );
   app.listen(port,function(err) 
{
    if(err)
    {
        console.log("ERROR ON RUNNNING THE SERVER!",err);
    }
   console.log("you are up on the express server",port);
});
    



