const express = require('express');
const app = express();
const port = 3000;
require('./config/mongoose');
const cors = require('cors');
const expressFileupload = require('express-fileupload');

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(expressFileupload());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname+'/assets'));
app.use('/', require('./routes'));

app.listen(port, () => {
    console.log("yippeee server is running");
});
