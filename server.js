const express = require('express');
const app = express();
const port = 3050;
require('./config/mongoose');

app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, () => {
    console.log("yippeee server is running");
});
