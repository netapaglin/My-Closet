const store = require('store2');

const onlyAdmin = (req, res, next) => {
  if (store('Profile').admin) {
    next();
  } else {
    res.status(401).send({ err: 'sorry, only Admin can do that' });
  }
};

module.exports = onlyAdmin;
