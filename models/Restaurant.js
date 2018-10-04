var mongoose = require('mongoose'); 
var RestaurantSchema=new mongoose.Schema({} ,  { collection : 'restaurant' });


mongoose.model('restaurant',RestaurantSchema);
module.exports=mongoose.model('restaurant');

// address : {
//     building : String,
//     coord : Array,
//     street : String,
//     zipcode : String
// },
// borough : String,
// cuisine : String,
// grades : mongoose.Schema.Types.DocumentArray,
// name : String,
// restaurant_id : String