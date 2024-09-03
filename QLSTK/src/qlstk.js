
const express = require('express');
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const initWebRoutes = require('./routes/web');
const connection = require('./config/database');


var app = express();
var port = 8081;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Config view engine
configViewEngine(app);
// Route
app.use('/',initWebRoutes);



// server
app.listen(port,() =>{
    console.log('Ung dung Node.js dang lang nghe tai dia chi: http://localhost:' + port);
});




