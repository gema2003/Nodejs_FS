const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Settings
app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index.js'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res, next) => {
	res.status(404).send('404 Not Found');
});

module.exports = app;