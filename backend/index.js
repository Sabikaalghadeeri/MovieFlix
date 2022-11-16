const express = require('express')
//initializing our application
const app = express()
const cors = require('cors')
const path = require('path')


//run database.js to connect to our database, but before that we need to run the .env file to get our database URI hidden variable
require('dotenv').config()
require('./config/database')


//Mount our middleware - will keep being updates
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'build')));

// ....
app.use('/',require('./routes/users'))


//REACT
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//listening on a port
app.listen(5001, ()=>{
    console.log('App listening on port 5001!')
})


