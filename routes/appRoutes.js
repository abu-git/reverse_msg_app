const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = require('../database');

//Reverse string function
function reverseString(str){
	//split string into an array
	var splitString =  str.split("");
	//reverse array
	var reverseArray = splitString.reverse();
	//join array
	var joinArray = reverseArray.join("");

	//remove the letter e
	var obfuscatedMessage = joinArray.replace(/e/g, "");

	return obfuscatedMessage;
}

//POST REQUEST to database
router.post('/submit', (req, res) =>{

	//date config
	var theDate = new Date();
	var date_to_be_saved = theDate.getDate() + "/" + (theDate.getMonth() + 1) + "/" + theDate.getFullYear() + 
		" " + theDate.getHours() + ":" + theDate.getMinutes() + ":" + theDate.getSeconds();

	//obfuscate message
	var obfuscated_message = reverseString(req.body.message);

	//insert into SQLite database
	var sql = 'INSERT INTO messageBoard (fullName, phoneNumber, email, message, date) VALUES(?,?,?,?,?)';
	var params = [req.body.fullName, req.body.phoneNumber, req.body.email, obfuscated_message, date_to_be_saved];
	db.run(sql, params);
	return res.status(200).send("SUCCESS");
});

//GET REQUEST to database
router.get('/view-all', (req, res) =>{
	var sql = 'SELECT * FROM messageBoard ORDER BY date';
	db.all(sql, [], (err, rows) =>{
		if(err){
			throw err;
		}
		rows.reverse();
		return res.json(rows);
	});
});

module.exports = router;