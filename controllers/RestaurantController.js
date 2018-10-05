var Restaurant = require('../models/Restaurant');
var url=require('url');

exports.getRestaurantData=function(req, res, next) {
    var urlAction=url.parse(req.url,true).query
    var pageNumber=parseInt(urlAction.pageNumber,10);
    var size=parseInt(urlAction.size,10);
    Restaurant.find( null, null, {skip : (pageNumber >0 ?((pageNumber-1)* size):0), limit: size },function(err,data){ 
    if (err) return res.status(500).send("There was a problem adding the information to the database.");
    res.status(200).send(data);
  });
}

exports.getMaxCuisineCountPerBorough=function(req,res){
   
    Restaurant.aggregate([
        {
            $group : {
                _id:{borough: "$borough",cuisine:"$cuisine"},
                count: { $sum: 1 }
            }
        }
        ,
        {   
            $sort :{
                 count : -1, "_id.borough": 1,"_id.cuisine":1 
            }

        },
        { 
            $group:{
                _id: "$_id.borough",
                cuisine: {
                $push:{
                    "cuisine":"$_id.cuisine",
                    "count":"$count",
                    }
                }
            }
        },
        {
            $project : {
                "_id":1,
                "cuisine" : {
                  $arrayElemAt: [ "$cuisine", 0 ]
                }
            }
        },
        {   
            $sort :{
                _id : 1
            }

        }
    ],function(err,data){
        if(err) return res.status(500).send("There was a problem querying the data.");
        res.status(200).send(data);
    })
}