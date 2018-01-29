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

var inventoryUpdate = [];
var updatedProduct = [];

connection.connect();

var managerOptions = {
	properties: {
		mOptions: {
			description: colors.blue('Pick one of the three options: 1)View Products for sale 2)View Low Inventory 3)Add to Inventory 4)Add New Product')
		},
	},
};

prompt.start();
prompt.get(managerOptions, function(err, res){
	if(res.mOptions == 1){
		viewProducts();
	} else if(res.mOptions == 2){
		viewInventory();
	} else if(res.mOptions == 3){
		addInventory();
	}else if(res.mOptions == 4){
		addProduct();
	} else {
		console.log("You picked an invalid choice.");
		connection.end();
	}
});

var viewProducts = function(){
	connection.query('SELECT * FROM products', function(err, res){
		console.log('');
		console.log('Products for sale');
		console.log('');

		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['blue'],
				compact: false,
				colAligns: ['center'],
			}
		});

		for(var i=0; i<res.length; i++){
			table.push(
				[res[i].item_id, res[i].product_name, res[i].department, res[i].price, res[i].stock_quantity]
			);
		}

		console.log(table.toString());
		connection.end();
	})
};

var viewInventory = function(){
	connection.query('SELECT * FROM products WHERE stock_quantity < 11', function(err, res){
		console.log('');
		console.log('Low Inventory Alert');
		console.log('');

		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['blue'],
				compact: false,
				colAligns: ['center'],
			}
		});
			for(var i=0; i<res.length; i++){
			table.push(
				[res[i].item_id, res[i].product_name, res[i].department, res[i].price, res[i].stock_quantity]
			);
		}

		console.log(table.toString());
		connection.end();
	})
};

var addInventory = function(){
	var addInv = {
		properties:{
			inventoryID: {
				description: colors.green('Please enter an inventory ID number.')
			},
			inventoryAmount: {
				description: colors.green('Please enter the amount of items to add to inventory.')
			}
		},
	};
	prompt.start();
	prompt.get(addInv, function(err, res){
		var inventoryAdded = {
			inventoryID: res.inventoryID,
			inventoryAmount: res.inventoryAmount,
		}

		inventoryUpdate.push(inventoryAdded);
		connection.query('UPDATE products SET stock_quantity = (stock_quantity + ?) WHERE item_id = ?;', [inventoryUpdate[0].inventoryAmount, inventoryUpdate[0].inventoryID], function(err, result){
			if (err) throw err;
		connection.query('Select * FROM products WHERE item_id = ?', inventoryUpdate[0].inventoryID, function(err, response){
			console.log('');
			console.log('The new inventory quantity for ID# ' + inventoryUpdate[0].inventoryID+ ' is ' + response[0].stock_quantity);
			console.log('');
			connection.end();
		})
	  })
	})
}


