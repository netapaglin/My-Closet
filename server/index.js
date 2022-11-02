process.env.TZ = 'Asia/Jerusalem'

const exp = require('express');
const session = require('express-session');
const cors = require('cors');
const app = exp();

app.use(exp.json());

app.use(cors());

app.use(
  session({
    secret: 'theHolyWord(Blah)',
    name: 'session',
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use('/', require('./routes/general'));
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));

app.listen(1000, (_) => console.log('Yooohooo'));
