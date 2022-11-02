const router = require('express').Router();
const SQL = require('../dbconfig');
const store = require('store2');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../helpers/auth")

// Get all products
router.get('/', async (req, res) => {
  
// router.get('/',auth, async (req, res) => {
  try {
    const products = await SQL('select * from product');
    res.send(products);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Get all Category
router.get('/category', async (req, res) => {
  try {
    const category = await SQL('SELECT * FROM category');
    res.send(category);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Get all product by category
router.get('/products/:category', async (req, res) => {
  try {
    let { category } = req.params;
    const productsByCategory = await SQL(`select * from product
    where product.category_id = ${category}`);
    res.send(productsByCategory);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Get number of orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await SQL('SELECT COUNT(*) as totalOrders FROM orders');
    res.send(orders);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Get number of products
router.get('/productsAmount', async (req, res) => {
  try {
    const productsAmount = await SQL(
      'SELECT COUNT(*) as totalProducts FROM product'
    );
    res.send(productsAmount);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Login
router.post('/login', async (req, res) => {
try{
  const response = { status: false, message: '', user: {} };
  const { name, password } = req.body;
  if (!name || !password) {
    response.message = 'missing username and/or password';
    return res.status(400).send(response);
  }
  const users = await SQL(`SELECT * FROM users`);
  const user = users.find((u) => u.name == name && u.password == password);

  if (!user) {
    response.message = 'wrong username and/or password';
    return res.status(400).send(response);
  }

  store('Profile', { fname: name, id: user.id, admin: user.admin });
  if (user) {
       const token = jwt.sign(
      { 
        user:
        {"id": user.id,
        "name": user.name,
        "last_name":user.last_name,
        "email": user.email,
        "city": user.city,
        "street": user.street,
        "admin":user.admin
      }
    },
        process.env.JWT_KEY,
      {
        expiresIn: "2h",
      }
    );
    res.status(200).json(token);
  }
} catch (err) {
  console.log(err);
}
console.log(store('Profile'));
});

// Register
router.post('/register', async (req, res) => {
  const { id, name, last_name, email, password, city, street, admin } =
    req.body;

  if (!id || !name || !last_name || !email || !password || !city || !street) {
    return res.status(400).send({ err: 'missing some information' });
  }
  const users = await SQL(`SELECT * FROM users`);
  console.log(users);
  if (users.find((user) => user.password == req.body.password)) {
    return res.status(400).send({ err: 'password already taken' });
  }
  if (users.find((user) => user.id == req.body.id)) {
    return res.status(400).send({ err: 'You are already registered' });
  }
  try {
    await SQL(`insert into users(id, name, last_name, email, password, city, street, admin )
    values('${id}', '${name}', '${last_name}', '${email}','${password}','${city}','${street}', '${admin}');`);
   
    store('Profile', { fname: `${name}`, id:`${id}`, admin: `${admin}` });
    
    const token = jwt.sign(
      { 
        user:
        {"id": id,
        "name": name,
        "last_name":last_name,
        "email": email,
        "city": city,
        "street": street,
        "admin":admin
      }
    },
        process.env.JWT_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.send({ token: token });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});

//logout
router.delete('/logout', (req, res) => {
  req.session.destroy();
  res.send({ msg: 'bye bye! it was nice to see you' });
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await SQL(`SELECT * FROM users`);
    res.send(users);
  } catch (err) {
    res.sendStatus(500);
    console.log('ooops');
  }
});

module.exports = router;
