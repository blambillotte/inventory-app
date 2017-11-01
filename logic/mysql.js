const mysql = require('mysql');
const Table = require('cli-table');

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
  console.log(`Connected as id: ${connection.threadId}`);
});



function listAllProducts() {
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


listAllProducts();


function printTable(data) {

  const table = new Table({ head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']});

  for (let key in data) {
    let tableRow = [
      data[key].item_id,
      data[key].product_name,
      data[key].department_name,
      data[key].price,
      data[key].stock_quantity];
    table.push(tableRow);
  }

  console.log(table.toString());
}
