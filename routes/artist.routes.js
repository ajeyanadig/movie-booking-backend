module.exports= app => {
  const router = require('express').Router();
  const artist=require('../controllers/artist.controller')
  router.get('/artists',artist.findAllArtists);


  app.use('/api',router)
}