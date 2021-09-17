const { Router } = require('express');
const crypto = require("crypto");
const fs = require('fs');

const router = Router();

const id = crypto.randomBytes(16).toString("hex");
const dataBooks = fs.readFileSync('src/database.json', 'utf-8');
let books = JSON.parse(dataBooks);


// ruta para acceder a el archivo index.ejs
router.get('/', (req, res) => {
	res.render('index.ejs', {
		books
	});
});

// ruta para acceder a el archivo new-entry.ejs
router.get('/new-entry', (req, res) => {
	res.render('new-entry.ejs');
});

// recibir datos y crea un objeto
router.post('/new-entry', (req, res) => {
	// console.log(req.body);
	const {title, author, image, description} = req.body;
	if(!title || !author || !image || !description) {
		res.status(400).send('Please complete all fields');
		return;
	}else {
		let newBook = {
		id,
		title,
		author,
		image,
		description
		}
	books.push(newBook);

	const json_books = JSON.stringify(books, null, 2);
	fs.writeFileSync('src/database.json', json_books, 'utf-8');

	res.redirect('/');
	}
});

// eliminar dato ingresado en database.json
router.get('/delete/:id', (req, res) => {
	books = books.filter((book) => book.id !== req.params.id);
	const json_books = JSON.stringify(books, null, 2);
	fs.writeFileSync('src/database.json', json_books, 'utf-8');

	res.redirect('/');
});

module.exports = router;