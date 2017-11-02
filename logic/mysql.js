const mysql = require('mysql');
const Table = require('cli-table');
const isInStock = require('./validate_inventory');
const colors = require('colors');
const numeral = require('numeral');


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

  });
}

const updateInventory = (productId, quantityReq, stockQuantity, price, productName) => {

  const billAmt = quantityReq * price;
  const newQuantity = stockQuantity - quantityReq;
  const queryString = `UPDATE products SET stock_quantity=${newQuantity} WHERE item_id=${productId}`;

  connection.query(queryString, function(error, result) {
    connection.end();

    console.log('\n----------------'.black);
    console.log(`Transaction Complete: Your Total Bill is ${numeral(billAmt).format('$0,0.00')}`.blue);
    console.log(`For ${quantityReq} ${quantityReq === 1 ? 'unit' : 'units'} of ${productName}`.blue);
    console.log(`Please reference the transaction details below:`.blue);

    printReciept(productId, price, quantityReq, productName, billAmt)

  });

}


const checkInventory = (productId, quantityReq) => {

  //Pass in SQL within the string query param
  const queryString = `SELECT * FROM products WHERE item_id=${productId}`;

  connection.query(queryString, function(error, result) {
    if (error) {
      throw error;
    }

    const inStock = isInStock(result[0].stock_quantity, quantityReq);

    if (inStock) {
      updateInventory(productId, quantityReq, result[0].stock_quantity, result[0].price, result[0].product_name);
    } else {
      console.log(`\nSorry, we don't have ${quantityReq} of the ${result[0].product_name} in stock`.red);
      connection.end();
    }

  });
}

function printReciept(productId, price, quantityReq, productName, billAmt) {
  const table = new Table(
    { head: ['Product ID', 'Product Name', 'Unit Price', 'Quantity', 'Total Amount'], style: { head: ['green'] }}
  );
  table.push(
    [productId, productName, `${numeral(price).format('$0,0.00')}`, quantityReq, `${numeral(billAmt).format('$0,0.00')}`]
  );
  console.log(table.toString());
}


function printTable(data) {

  const table = new Table(
    { head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'], style: { head: ['green'] }}

  );

  for (let key in data) {
    let tableRow = [
      data[key].item_id,
      data[key].product_name,
      data[key].department_name,
      numeral(data[key].price).format('$0,0.00'),
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
