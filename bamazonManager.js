var mysql = require("mysql");
var inquirer = require("inquirer");
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
    displayMenu();
});


function displayMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'name',
                message: 'What do you want to do?',
                choices: [
                    'View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product',
                ]
            }
        ])
        .then(answer => {
            var choice = answer.name;
            switch (choice) {
                case 'View Products for Sale':
                    viewProducts();
                    break;

                case 'View Low Inventory':
                    lowInventory();
                    break;

                case 'Add to Inventory':
                    addInventory();
                    break;

                case 'Add New Product':
                    addProduct();
                    break;
            }
        });
};

function viewProducts() {
    connection.query("SELECT * FROM products ", function (err, result) {
        if (err) throw err;
        console.log("\n CURRENT INVENTORY \n")
        for (var i = 0; i < result.length; i++) {
            console.log(result[i].id + ". " + result[i].product_name.toString() + " - $" + result[i].price + " In Stock: " + result[i].stock_quantity);
        }
    });
    displayMenu();
};

function lowInventory() {
    connection.query("SELECT * FROM products ", function (err, result) {
        if (err) throw err;
        console.log("\n LOW STOCK \n")
        for (var i = 0; i < result.length; i++) {
            if (result[i].stock_quantity <= 5) {
                console.log(result[i].id + ". " + result[i].product_name.toString() + " - $" + result[i].price + " In Stock: " + result[i].stock_quantity);
            }
        }
    });
    displayMenu();
};

function addInventory() {
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.log("\n ADD INVENTORY \n")
        //item prompt 
        inquirer.prompt([{
            name: "itemID",
            type: "input",
            message: "What is the Item ID # you would like to update?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            name: "quantity",
            type: "input",
            message: "What is the new number of products in stock?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function (answers) {
            var updateID = answers.itemID;
            var updateQuantity = answers.quantity;
            connection.query("UPDATE products SET stock_quantity = " + updateQuantity + " WHERE id = " + updateID);
            updateConfirmation(updateID);
        });
    });
};

function updateConfirmation(updateID) {
    connection.query("SELECT * FROM products WHERE id =" + updateID, function (err, result) {
        if (err) throw err;
        console.log("Inventory has been updated.")
        for (var i = 0; i < result.length; i++) {
            console.log(result[i].id + ". " + result[i].product_name.toString() + " In Stock: " + result[i].stock_quantity);
        }
    });
    displayMenu();
};

function addProduct() {
    inquirer.prompt(newProductQs)
        .then(function (answers) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                  product_name: answers.product_name,
                  department_name: answers.department,
                  price: answers.price,
                  stock_quantity: answers.quantity
                },
                function(err) {
                  if (err) throw err;
                  console.log("Your item was created successfully!");
                  // re-prompt the user for if they want to bid or post
                  displayMenu();
                }
              );
            });      
};


var newProductQs = [
    {
        name: "product_name",
        type: "input",
        message: "What is the name of the product you would like to add?",
        validate: function (value) {
            return value !== '';
        },
    },
    {
        name: "department",
        type: "input",
        message: "What is the department?",
        validate: function (value) {
            return value !== '';
        },
    },
    {
        name: "price",
        type: "input",
        message: "What is the item price?",
        validate: function (value) {
            return value !== '';
        },
    },
    {
        name: "quantity",
        type: "input",
        message: "What is the item quantity?",
        validate: function (value) {
            return value !== '';
        },
    },
]