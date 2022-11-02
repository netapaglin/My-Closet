const store = require('store2');
const SQL = require('../dbconfig');

const getCart = async (req, res, next) => {

  try {

    const count = await SQL(`SELECT COUNT(*) AS count FROM cart 
    where cart.user_id = '${store('Profile').id}'`)

    let results = JSON.parse(JSON.stringify(count))[0].count

    if (results == 0) {
      console.log('none')
      store('Cart', { cartStatus: 3 })
    } else {
      const status = await SQL(`select * from cart
    where cart.user_id = '${store('Profile').id}' 
    ORDER BY cartId DESC LIMIT 1`)
      store('Cart', { cartId: status[0].cartId, cartStatus: status[0].status })
      console.log(`cartStatus 1  ` + `${store('Cart').cartStatus}`)
      console.log(`ID ` + `${store('Cart').cartId}`)
    }




    next();
  } catch (err) {
    res.status(401).send({ err: 'sorry ' });
  }
};


module.exports = getCart;
