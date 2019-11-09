const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const databaseInfo = require('./database.json');

const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host : databaseInfo.host,
  user : databaseInfo.user,
  password : databaseInfo.password,
  port: databaseInfo.port,
  database : databaseInfo.database,
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// connection.query('SELECT * FROM TBL_EASYPATH_INFO', function (error, results, fields) {
//   if (error) {
//       console.log(error);
//   }
//   console.log(results);
// });

// Set env values.
require('dotenv').config();

app.set('view engine', 'ejs');

// Set for static file
app.use(express.static(`${__dirname}/public`));

// Set bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set routes
app.use('/', require('./routes/home'));
app.use('/study', require('./routes/study'));
app.use('/easypath', require('./routes/easypath'));
app.use('/user', require('./routes/user'));

app.listen(port, function () {
  console.log(`DB app listening on ${port}!`);
});