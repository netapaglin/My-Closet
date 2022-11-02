const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_closet',
});

con.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log('connected to my closet :)');
});

const SQL = (q) => {
  return new Promise((resolve, reject) => {
    con.query(q, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = SQL;
