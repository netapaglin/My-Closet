// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  productsAmountUrl: "http://localhost:1000/productsAmount",
  ordersAmountUrl: "http://localhost:1000/orders",
  loginUrl: "http://localhost:1000/login",
  registerUrl: "http://localhost:1000/register",
  getAllProductsUrl: "http://localhost:1000/",
  getCategorysUrl: "http://localhost:1000/category",
  getProductsByCategoryUrl: "http://localhost:1000/products/",
  addProductToCartUrl: "http://localhost:1000/user",
  getCartItemsUrl: "http://localhost:1000/user/cart",
  getCartStatusUrl: "http://localhost:1000/user/cartStatus",
  deleteProductFromCartUrl: "http://localhost:1000/user/cart/",
  updateCartProductUrl: "http://localhost:1000/user/cart/",
  emptyCartProductUrl: "http://localhost:1000/user/products",
  addProductUrl: "http://localhost:1000/admin",
  editProductUrl: "http://localhost:1000/admin/",
  OrderUrl: "http://localhost:1000/user/order",
  CartOrderUrl: "http://localhost:1000/user/cartOrder",
  OrderDatesUrl: "http://localhost:1000/user/orderdates"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
