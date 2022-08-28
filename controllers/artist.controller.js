const db=require('../models');
const Artist=db.artists;
exports.findAllArtists=(req,res)=>{
  Artist.find({}).then((data)=>{res.send({artists:data})})
  .catch(err=>{res.status(500).send('Error retrieving data')})
}