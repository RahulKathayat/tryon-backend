const express = require('express');
const authRoute = require('./auth.route');
const commonRoute = require('./common.route');
const userRoute = require('./user.route');
const refundRoute = require('./refund.route');
const ratingsRoute = require('./ratings.route');
const productRoute = require('./product.route');
const paymentRoute = require('./payment.route');
const orderRoute = require('./order.route');
const orderDetailsRoute = require('./orderDetails.route');
const wishListRoute = require('./wishList.route');
const CategoryRoute = require('./category.route');
const subCategoryRoute = require('./subCategory.route');
const subSubCategoryRoute = require('./subSubCategory.route');
const addressRoute = require('./address.route');
const cartRoute = require('./cart.route');
const fabricRoute = require('./fabric.route');
const productFabricRoute = require('./productFabric.route');
const subscribedUserRoute = require('./subscribedUser.route');
const shipRocketRoute = require('./shipRocket.route');
const paymentLogRoute = require('./paymentLog.route');
const discountCoupon = require('./coupon.route');
const setting = require('./setting.route');

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
  },
  {
    path: '/cart',
    route: cartRoute
  },
  {
    path: '/fabric',
    route: fabricRoute
  },
  {
    path: '/productFabric',
    route: productFabricRoute
  },
  {
    path: '/subscribedUser',
    route: subscribedUserRoute
  },
  {
    path: '/shipRocket',
    route: shipRocketRoute
  },
  {
    path: '/discountCoupon',
    route: discountCoupon
  },
  {
    path: '/cms',
    route: setting
  },
  {
    path: '/paymentLog',
    route: paymentLogRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
