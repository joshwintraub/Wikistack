const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const { layout, main } = require("./views/layout");
const models = require("./models");
const { db } = require('./models'); // destructuring
// const wikiRouter = require('./routes/wiki');
// const userRouter = require('./routes/user');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
models.db.sync({force: true});
app.use('/wiki', require('./routes/wiki'));
app.use('/user', require('./routes/user'));


db.authenticate().then(() => {
  console.log('connected to the database');
});

app.get("/", (req, res) => {
  res.redirect('/wiki');
});

const PORT = 3000;
const init = async () => {
  await models.db.sync();
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
