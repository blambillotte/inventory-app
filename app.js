const queryDB = require('./logic/mysql')
const figlet = require('figlet');
const inquire = require('./logic/inquirer');
const colors = require('colors');


/* ****** Startup Text *******/
figlet('Inventory  CLI', function(err, data) {
    if (err) { console.dir(err); return;}
    console.log(data.america)
});

/* ****** List Inventory *******/
setTimeout(function() {
  console.log(`\nProducts Currently Available:`.blue);
  queryDB.listAllProducts();
}, 500);

/* ****** Init User Prompt *******/
setTimeout(function() {
  console.log(`\n`);
  inquire.customerInput();
}, 1500);
