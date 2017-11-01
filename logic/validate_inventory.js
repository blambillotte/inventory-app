
const isInStock = (productInv, requestAmt) => {
  if (parseInt(requestAmt) > parseInt(productInv)) {
    return false;
  } else {
    return true;
  }
};

//console.log(isInStock(7, 5));

module.exports = isInStock;
