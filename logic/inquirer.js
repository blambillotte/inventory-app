const inquirer = require('inquirer');
const queryDB = require('./mysql')


const customerInput = () => {
  inquirer.prompt([
    {
      name: "productId",
      message: "Specify a product ID",
      validate: function (value) {
        if (!isNaN(value)) {
          return true;
        }
        return 'Please enter a valid product number';
      }
    },
    {
      name: 'productQuantity',
      message: 'How many would you like to buy?',
      validate: function (value) {
        if (!isNaN(value)) {
          return true;
        }
        return 'Please enter a valid numeric quantity';
      }
    }
  ]).then(function(answer) {
    queryDB.checkInventory(answer.productId, answer.productQuantity);
    //console.log(query);
  });
  //console.log(prompt);
}

//customerInput();

//console.log(queryDB.checkInventory(1, 20));

module.exports = {customerInput};
