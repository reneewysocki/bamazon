var mysql = require("mysql");
var inquirer = require("inquirer");
// var cTable = require('console.table');
require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.SQL_PASS,
  database: "bamazon"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  chooseItem();
});

function chooseItem() {
  connection.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;


    //lists items 
    console.log("HORSEY TACK TRADER");
    console.log("Items for Sale");
    console.log("------------------");
    for (var i = 0; i < result.length; i++) {
      console.log("id:" + result[i].id + " - " + result[i].product_name.toString() + "- Price: $" + result[i].price);
    }
    // console.log("------------------");

    //item prompt 
    inquirer.prompt([{
      name: "itemID",
      type: "input",
      message: "Please type the Item ID # you would like to purchase?",
      validate: function(value) {
          if (isNaN(value) === false) {
              return true;
          } 
      }
  }, {
      name: "quantity",
      type: "input",
      message: "How many of this product would you like to buy?",
      validate: function(value) {
       if (isNaN(value) === false) {
           return true;
       } else {
           return false;
       }
      }
  }]).then(function(answers) {
      var chosenID = answers.itemID;
      var chosenQuantity = answers.quantity;
      purchase(chosenID, chosenQuantity);
  });
});
}

function purchase(ID, quantity) {

  connection.query("SELECT * FROM products WHERE id = " + ID, function(err, result) {
    if (err) throw err;
    if (quantity <= result[0].stock_quantity) {
      var totalCost = result[0].price * quantity;

      console.log("Your total is $" + totalCost + ". Thank you for your purchase!");
      console.log("------------------");

      //Update quantity in the DB
      connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + " WHERE id = " + ID);
  
  } else {

      console.log("We don't have enough of that item to fulfill your order.");
  };

//  Callback to chooseItem function.
 chooseItem();
  });
}