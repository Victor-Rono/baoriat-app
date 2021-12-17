


const express = require('express');

//config


const app = express();

//endpoint


const port = 3000;

app.get('/', (req, res)=>{
  res.send('Hello')
});



app.listen(port, ()=> {
  console.log("Hello Nodes  ")
})
