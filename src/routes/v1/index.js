const express = require('express');
const authRoute = require('./auth.route');
const commonRoute = require('./common.route')
const userRoute = require('./user.route');
const refundRoute = require('./refund.route');
const ratingsRoute = require('./ratings.route');
const productDetailRoute = require('./productDetails.route');
const productRoute = require('./product.route');
const paymentRoute = require('./payment.route');
const orderRoute = require('./order.route');
const orderDetailsRoute = require('./orderDetails.route');
const addProductRoute = require('./addProduct.route');




const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },

  {
    path: '/user',
    route: userRoute
  },
  {
    path: '/refund',
    route: refundRoute
  },
  {
    path: '/ratings',
    route: ratingsRoute
  },
  {
    path: '/productDetail',
    route: productDetailRoute
  },
  {
    path: '/product',
    route: productRoute
  },
  {
    path: '/payment',
    route: paymentRoute
  },
  {
    path: '/order',
    route: orderRoute
  },
  {
    path: '/orderDetails',
    route: orderDetailsRoute
  },
  {
    path: '/addProduct',
    route: addProductRoute
  },
  
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
