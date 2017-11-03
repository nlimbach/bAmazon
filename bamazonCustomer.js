var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    DisplayAllItems();

});

function DisplayAllItems() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item " +res[i].id + " - " + res[i].product_name + " from department " + res[i].department_name + "- Price: " + res[i].price );
        }

       userActivity(res);

    });
}


function userActivity(response) {
    var currentQuantity;
    var numResponses = response.length;

    inquirer
        .prompt([
            {
                name: "itemNumber",
                type: "input",
                message: "Which item number would you like to buy?",
            },
            {
                name: "itemQuantity",
                type: "input",
                message: "How many would you like to buy?",
            }
        ])
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.itemNumber > 0 && answer.itemNumber <= numResponses) {
                console.log("You chose " + answer.itemQuantity + " units of item " + answer.itemNumber);

                connection.query(
                    "SELECT stock_quantity, price FROM products WHERE ?",
                    [

                        {
                            id: answer.itemNumber
                        }
                    ],
                    function (error, res) {
                        if (error) throw err;
                        // console.log(res[0].stock_quantity);
                        // console.log(res[0]);

                        currentQuantity = res[0].stock_quantity;
                        if ( answer.itemQuantity <= currentQuantity){
                            currentQuantity = currentQuantity - answer.itemQuantity;
                            var cost = answer.itemQuantity * res[0].price ;
                            console.log("We have enough units in stock! Your total cost is " + cost);


                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: currentQuantity
                                    },
                                    {
                                        id: answer.itemNumber
                                    }
                                ],
                                function(err, res) {
                                    console.log("Item " + answer.itemNumber + " now has " + currentQuantity + " items in stock.")
                                }
                            )

                        }
                        else{
                            console.log("Sorry, we don't have that many items in stock. Please make a new selection");
                            userActivity(response);
                        }
                    }
                )
            }
            else {
                console.log("That is not a legitimate item number. Please choose again");
                userActivity(response);
            }
        });

}