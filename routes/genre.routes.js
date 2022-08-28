module.exports= app => {
  const router = require('express').Router();
  const genre=require('../controllers/genre.controller');


  router.get('/genres',genre.findAllGenres);


  app.use('/api',router)
}