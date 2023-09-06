const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contacts_list_db');
const db=mongoose.connection.on('error',function()
{
    console.log('error');
}); 
db.once('open',function()
{
    console.log("connected to the db");
});