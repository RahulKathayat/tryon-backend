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
const wishListRoute = require('./wishList.route');
const CategoryRoute = require('./category.route');
const subCategoryRoute = require('./subCategory.route');
const subSubCategoryRoute = require('./subSubCategory.route');
const addressRoute= require("./address.route")

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
    path: '/address',
    route: addressRoute
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
    path: '/wishList',
    route: wishListRoute
  },
  {
    path: '/category',
    route: CategoryRoute
  },
  {
    path: '/subCategory',
    route: subCategoryRoute
  },
  {
    path: '/subSubCategory',
    route: subSubCategoryRoute
  }
  
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
