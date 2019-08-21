const sqlite3 = require('sqlite3').verbose();

//open database
let db = new sqlite3.Database('./db/obfuscatedmessage.db', (err) =>{
	if(err){
		return console.log(err.message);
	}
	console.log('Connected to SQLite Database');

	/*/Create table
	db.run(`CREATE TABLE messageBoard(
				message_id INTEGER PRIMARY KEY AUTOINCREMENT,
				fullName TEXT NOT NULL,
				phoneNumber TEXT NOT NULL,
				email TEXT NOT NULL,
				message TEXT NOT NULL,
				date TEXT NOT NULL
	)`, (err) => {
		//Table already created
		console.log(err.message);
	});*/
});

module.exports = db;