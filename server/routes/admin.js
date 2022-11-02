const router = require('express').Router();
const SQL = require('../dbconfig');
const onlyAdmin = require('../helpers/onlyAdmin');

//Add product
router.post('/', onlyAdmin, async (req, res) => {
  const { name, category_id, price, img } = req.body;
  try {
    await SQL(`insert into product(name, category_id, price, img)
      values('${name}', '${category_id}','${price}', '${img}')`);
    res.send({ msg: 'Product added' });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});

//Edit product
router.put('/:id', onlyAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, category_id, price, img } = req.body;
  try {
    await SQL(`UPDATE product
      SET product.name = '${name}', product.category_id = '${category_id}', product.price = '${price}', product.img = '${img}'
      WHERE id = '${id}'`);

    res.send({ msg: 'Product updated' });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});

module.exports = router;
