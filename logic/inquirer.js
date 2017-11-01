const inquirer = require('inquirer');
const queryDB = require('./mysql')


const customerInput = () => {
  return inquirer.prompt([
    {
      name: "productId",
      message: "Specify a product ID",
      // validate: function (value) {
      //   if (typeof parseInt(value) === 'number') {
      //     return true;
      //   }
      //
      //   return 'Please enter a valid product number';
      // }
    },
    {
      name: 'productQuantity',
      message: 'How many would you like to buy?'
    }
  ]).then(function(answer) {
    queryDB.checkInventory(answer.productId, answer.productQuantity);
    console.log(answer);
  });
}

customerInput();

//console.log(queryDB.checkInventory(1, 20));
