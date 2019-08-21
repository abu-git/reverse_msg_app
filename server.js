const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const routes = require('./routes/appRoutes');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

//Bodyparser
//this enables the app to use req.body
app.use(bodyParser.urlencoded({ extended: false }))


//Routes
app.use('/', routes);

app.listen(PORT, () =>{
	console.log('Server is running on Port:' + PORT);
});