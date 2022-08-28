module.exports= app => {
  const router = require('express').Router();
  const user= require('../controllers/user.controller');
  router.get('/users',user.findAllUsers);
  router.post('/auth/signup',user.signUp);
  router.post('/auth/login',user.login);
  router.post('/auth/logout',user.logout);
  router.get('/auth/coupons',user.getCouponCode);
  router.post('/auth/bookings',user.bookShow);



  app.use('/api',router)
}