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

var productPurchased = [];

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

purchase();
});



var purchase = function() {
	var productInfo = {
		properties: {
			item_id:{description: colors.bold.blue('Please enter the ID# of the items you wish to buy.')},
			Quantity:{description: colors.bold.green('How many items would you like to buy?')}
		},
	};

prompt.start();
prompt.get(productInfo, function(err, res){
	var custPurchase = {
		item_id: res.item_id,
		Quantity:res.Quantity
	};

	productPurchased.push(custPurchase);
	connection.query('SELECT * FROM products WHERE item_id=?', productPurchased[0].item_id, function(err,res){
		if (err) console.log(err, "That item ID doesn't exist");
			
		if (res[0].stock_quantity < productPurchased[0].Quantity){
			console.log("That product is out of stock.");
			connection.end();

		} else if (res[0].stock_quantity >= productPurchased[0].Quantity){
			console.log('');
			console.log(productPurchased[0].Quantity + " items purchased");
			console.log(res[0].product_name + ' ' + res[0].price);
			var saleTotal = res[0].price * productPurchased[0].Quantity;
			console.log('Total: ' + saleTotal);
			var newQuantity = res[0].stock_quantity - productPurchased[0].Quantity;
			//console.log(newQuantity);

				connection.query("UPDATE products SET ? WHERE ?",
					[{stock_quantity:  newQuantity },
					 {item_id: productPurchased[0].item_id}],
					function(err, res){
						if (err) throw err;
					
						console.log('');
						console.log(colors.cyan('Your order has been processed.  Thank you for shopping with us!'));
						console.log('');




						connection.end();
					})
		}
	})

})

}

