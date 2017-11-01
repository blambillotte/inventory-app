const mysql = require('mysql');
const Table = require('cli-table');
const isInStock = require('./validate_inventory');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});

connection.connect(function(error) {
  if (error) {
    throw error;
  }
//  console.log(`Connected as id: ${connection.threadId}`);
});



const listAllProducts = () => {
  //Pass in SQL within the string query param
  const queryString = 'SELECT * FROM products';

  connection.query(queryString, function(error, result) {
    if (error) {
      throw error;
    }

    // console.log(result);
    printTable(result);

    //End the connection once we're done
    connection.end();
  });
}

const checkInventory = (productId, quantityReq) => {

  //Pass in SQL within the string query param
  const queryString = `SELECT * FROM products WHERE item_id=${productId}`;

  connection.query(queryString, function(error, result) {
    if (error) {
      throw error;
    }

    console.log(isInStock(result[0].stock_quantity, quantityReq))
    connection.end();

  });
}


function printTable(data) {

  const table = new Table(
    { head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']}
  );

  for (let key in data) {
    let tableRow = [
      data[key].item_id,
      data[key].product_name,
      data[key].department_name,
      data[key].price,
      data[key].stock_quantity
    ];

    table.push(tableRow);
  }

  console.log(table.toString());
}


module.exports = {
  listAllProducts,
  checkInventory
}
