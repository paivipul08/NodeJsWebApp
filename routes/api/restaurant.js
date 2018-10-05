var express = require('express');
var router = express.Router();
var RestaurantController=require('../../controllers/RestaurantController');

const auth = require('../auth');
/* GET users listing. */
router.get('/getData', auth.required,RestaurantController.getRestaurantData);

router.get('/getMaxCuisineCountPerBorough',auth.required,RestaurantController.getMaxCuisineCountPerBorough);


module.exports = router;
