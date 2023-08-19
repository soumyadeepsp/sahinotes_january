const express = require('express');
const app = express();
const port = 3000;
require('./config/mongoose');
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname+'/assets'));

app.listen(port, () => {
    console.log("yippeee server is running");
});
