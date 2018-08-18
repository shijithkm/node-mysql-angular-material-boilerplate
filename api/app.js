const mapRoutes = require('express-routes-mapper'); 
const routes = require('./src/config/routes');
const express = require('express');
const app = express();

app.use(express.json());

const mappedRoutes = mapRoutes(routes,'src/controllers/');
app.use('/api',mappedRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening port ${port}`);
})