const router = require('express').Router();
const SQL = require('../dbconfig');
const store = require('store2');
const onlyUsers = require('../helpers/onlyUsers');
const getCart = require('../helpers/getCart');
const auth = require('../helpers/auth')
const moment = require('moment');


//Get Cart Status
router.get('/cartStatus', getCart, async (req, res) => {
  try {
    console.log(`${store('Cart').cartStatus}`)
    res.send(`${store('Cart').cartStatus}`);
  } catch (err) {
    res.sendStatus(500);
  }
});

//Get cart items
router.get('/cart', getCart, async (req, res) => {

  console.log(`cartIdForGet  ` + `${store('Cart').cartId}`)
  try {
    const items = await SQL(`SELECT * from cart_item
    INNER JOIN product
    ON cart_item.product_id = product.id
    where cart_id = '${store('Cart').cartId}' `);

    res.send(items);
  } catch (err) {
    res.sendStatus(500);
  }
});


//Add product to cart

router.post('/', getCart, async (req, res) => {
  // router.post('/', auth , getCart, async (req, res) => {
  const { product_id, quantity, size } = req.body;
  if (`${store('Cart').cartStatus}` != 1) {
    await SQL(`insert into cart(user_id, status)
    values('${store('Profile').id}', true)`)

    console.log(`cartId 2 ` + `${store('Cart').cartId}`)
    console.log(`cartStatus 2 ` + `${store('Cart').cartStatus}`)

    const status = await SQL(`select * from cart
    where cart.user_id = '${store('Profile').id}' 
    ORDER BY cartId DESC LIMIT 1`)
    store('Cart', { cartId: status[0].cartId, cartStatus: status[0].status })

    console.log(`cartId 3 ` + `${store('Cart').cartId}`)
    console.log(`cartStatus 3 ` + `${store('Cart').cartStatus}`)

  }
  try {
    await SQL(`insert into cart_item(product_id, cart_id, quantity, size )
      values(${product_id}, '${store('Cart').cartId}', ${quantity}, '${size}')`);
    res.send({ msg: 'Item added' });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});

//Update product
router.put('/cart/:id', getCart, async (req, res) => {
  let { id } = req.params;
  let { size, quantity } = req.body;
  try {
    await SQL(
      `UPDATE cart_item SET cart_item.quantity = '${quantity}', cart_item.size = '${size}' WHERE product_id = ${id} and cart_id = ${store('Cart').cartId
      } `
    );
    res.send({ msg: 'Item updated' });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});

//Delete product
router.delete('/cart/:id', getCart, async (req, res) => {
  // router.post('/cart/:id', auth , getCart, async (req, res) => {
  let { id } = req.params;
  try {
    await SQL(
      `DELETE FROM cart_item WHERE product_id = ${id} and cart_id = ${store('Cart').cartId
      } `
    );
    res.send({ msg: 'Item deleted' });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});


//Delete all products
router.delete('/products', getCart, async (req, res) => {

  try {
    await SQL(
      `DELETE FROM cart_item WHERE cart_id = ${store('Cart').cartId} `
    );
    res.send({ msg: 'Your cart is empty now' });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});


//Find available arrival dates
router.get('/orderdates', async (req, res) => {
  try {
    const order = await SQL(`SELECT arrival_date FROM orders `);
    res.send(order);
  } catch (err) {
    res.sendStatus(500);
  }
});


//Get cart details for order
router.get('/cartOrder', getCart, async (req, res) => {

  try {
    console.log(`${store('Cart').cartId}`)
    const order = await SQL(`SELECT * FROM cart
    INNER JOIN users ON cart.user_id = users.id 
   WHERE cart.cartId ='${store('Cart').cartId}'`);
    res.send(order);
  } catch (err) {
    res.sendStatus(500);
  }
});


//Place order
router.post('/order', getCart, async (req, res) => {
  let { final_price, street, city, arrival_date, creditcard } = req.body;
  // req.body.arrival_date = req.body.arrival_date.toLocaleString()

  console.log(req.body.arrival_date)

  // arrival_date = new Date(arrival_date).toLocaleString('en-US', {
  //   timeZone: 'Asia/Jerusalem'
  // });
  try {
    await SQL(`insert into orders(cart_id, final_price, street, city, arrival_date, creditcard)
    values('${store('Cart').cartId}', '${final_price}', '${street}', '${city}', '${arrival_date}', '${creditcard}')`);
    await SQL(
      `UPDATE cart  SET cart.status = 0 WHERE cartId = '${store('Cart').cartId}'`
    );
    res.send({ msg: 'Order placed' });  
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});

router.get('/cartItem', async (req, res) => {
  try {
    const status = await SQL(`SELECT * from cart_item`);
    res.send(status);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
