const mapRoutes = require('express-routes-mapper'); 
const routes = require('./src/config/routes');
const express = require('express');
const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mappedRoutes = mapRoutes(routes,'src/controllers/');
app.use('/api',mappedRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening port ${port}`);
})