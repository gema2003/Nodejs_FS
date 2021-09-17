const app = require('./app.js');

// función asincrona para arrancar la aplicación.
(async function main () {
	await app.listen(app.get('port'));
	console.log('serve on port', app.get('port'));
})();

// función callback para arrancar la aplicación.
// app.listen(3000, () => {
// 	console.log('serve on port 3000');
// });