const db=require('../models');
const Genre=db.genres;
exports.findAllGenres=(req,res)=>{
  Genre.find({}).then((data)=>{res.send({genres:data})})
  .catch(err=>{res.status(500).send('Error retrieving data')})
}