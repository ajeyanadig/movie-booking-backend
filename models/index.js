const mongoose= require('mongoose');
const dbConfig = require('../config/db.config');
const db={};
db.mongoose=mongoose;
db.url=dbConfig.url;
db.users=require('./user.model')(mongoose);
db.genres=require('./genre.model')(mongoose);
db.artists=require('./artist.model')(mongoose);
db.movies=require('./movie.model')(mongoose);

module.exports=db;