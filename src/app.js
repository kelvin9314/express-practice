const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
const path = require('path');

const db = require('./db');
const collection = 'todo';

const port = process.env.PORT || 8080;

db.conncet((err)=>{
  if(err){
    console.log('Unable to connect to database');
    process.exit(1);
  }else{
    app.listen(port, () => {
      console.log(`connected to database, app listening on port ${port}...`);
    });
    
  }
})


