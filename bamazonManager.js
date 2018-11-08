var mysql = require("mysql");
var inquirer = require("inquirer");
const menu = require('inquirer-menu');
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "SmallShowCoverFeed11",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    manageMenu();
});


function manageMenu() {
    return {
        message: 'What would you like to do?',
        choices: {
            View_Products: function () {
                viewProducts();
            },
            View_Low_Inventory: function () {
                lowInventory();
            },
            Add_Inventory: function () {
                addInventory();
            },
            Add_New_Product: function () {
                addProduct();
            },
        }
    };

};


menu(manageMenu)
    .then(function () {
        console.log('Thank You!');
    })
    .catch(function (err) {
        console.log(err.stack);
    });


function viewProducts() {
    connection.query("SELECT * FROM products ", function (err, result) {
        if (err) throw err;
        console.log("\n CURRENT INVENTORY \n")
        for (var i = 0; i < result.length; i++) {
            console.log(result[i].id + ". " + result[i].product_name.toString() + " - $" + result[i].price + " In Stock: " + result[i].stock_quantity);
        }
    });
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
};

function addInventory() {
    connection.query("SELECT * FROM products ", function (err, result) {
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
            // var updateID = answers.itemID;
            // var updateQuantity = answers.quantity;
            connection.query("UPDATE products SET stock_quantity = " + answers.quantity + " WHERE id = " + answers.itemID);
        });
    });
};



function addProduct() {
    connection.query("SELECT * FROM products ", function (err, result) {
        if (err) throw err;
        console.log("\n ADD PRODUCT \n")
        //item prompt 
        inquirer.prompt([{
                name: "product_name",
                type: "input",
                message: "What is the name of the product you would like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                },
                name: "department",
                type: "input",
                message: "What is the name of the product you would like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                },
                name: "price",
                type: "input",
                message: "What is the name of the product you would like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                },
                name: "quantity",
                type: "input",
                message: "What is the name of the product you would like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                },
            }]).then(function (answers) {
                // var updateID = answers.itemID;
                // var updateQuantity = answers.quantity;
                connection.query("INSERT INTO products (product_name, department_name, price, quantity) VALUES (" + answers.product_name, answers.department, answers.price, answers.quantity + ")");
                
            });
    });
};


