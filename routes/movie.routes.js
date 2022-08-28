module.exports= app => {
  const movie= require('../controllers/movie.controller');
  const router = require('express').Router();
  router.get('/movies',movie.findAllMovies);
  router.get('/movies/:movieId',movie.findOne);



  app.use('/api',router)
}

