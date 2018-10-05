var env=process.env.NODE_ENV || 'dev';

var mongoose=require('mongoose');
var config=require('./config.'+env);

const connectionString=`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
mongoose.connect(connectionString,{ useNewUrlParser: true ,useCreateIndex: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
