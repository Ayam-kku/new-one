const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan');

const path = require('path');


// متغير الداتا بيس
const connectDB = require('./adminDashboard/database/connection');
// متغير السرفر
const app = express()
app.use('/uploads',express.static('uploads'))

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// توصيل الداتا بيس
connectDB();

// parse request to body-parser
app.use(express.urlencoded({ extended : true}))

app.use('/', require('./adminDashboard/routes/router'))

app.listen(PORT, ()=> { 
  console.log(`Server is running on http://localhost:${PORT}`)
});