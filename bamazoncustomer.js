var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors');
var Table = require('cli-table');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'bamazon'
});

var productsPurchased = [];

connection.connect();

connection.query('SELECT item_id, product_name, price FROM products', function(err, result){
	if (err) throw err;
	console.log("connected as id: ", connection.threadID);
	
	var table = new Table ({
		head: ['Item ID#', 'Product Name', 'Price'],
		style: {
			head: ['blue'],
			compact: false,
			colsAligns: ['center'],
		}

	})


	for(var i = 0; i < result.length; i++) {
		table.push(
			[result[i].item_id, result[i].product_name, result[i].price]
		);
}
console.log(table.toString());


});