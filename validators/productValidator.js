//
// Functions for validating products
//

// for documentation see: https://www.npmjs.com/package/validator
const validator = require('validator');

// Import existing validateId function from baseValidators.
const { validateId } = require('./baseValidators');

// Import product object model
const Product = require('../models/product');

// Validate the body data, sent by the client, for a new product
// product represents the data filled in a form
// It needs to be validated before using in gthe application
function validateNewProduct(product) {
    // Declare constants and variables
    let validated_product;

    // debug to console - if no data
    if (product === null) {
        console.log('validateNewProduct(): Parameter is null');
    }
    // Validate form data for new product fields
    // Creating a product does not need a product id
    // Adding '' to the numeric values makes them strings for validation purposes ()
    // appending + '' to numbers as the validator only works with strings
    if (
        validateId(product.category_id) && 
        !validator.isEmpty(product.product_name) && 
        !validator.isEmpty(product.product_description) && 
        validator.isNumeric(product.product_stock + '', { no_symbols: true, allow_negatives: false }) && 
        validator.isCurrency(product.product_price + '', { no_symbols: true, allow_negatives: false }))
    {
        // Validation passed
        // create a new Product instance based on Product model object
        // no value for product id (passed as null)
        validated_product = new Product(
                0, // New product as no id
                product.category_id,
                // escape is to sanitize - it removes/ encodes any html tags
                validator.escape(product.product_name),
                validator.escape(product.product_description),
                product.product_stock,
                product.product_price
            );
    } else {
        // debug
        console.log("validateNewProduct(): Validation failed");
    }
    // return new validated product object
    return validated_product;
}


const validateUpdate = (product) => {

    // Use existing validator
    let validated_product = validateNewProduct(product);

    // validate id
    if (validateId(product.id)) {
        validated_product.id = product.id
    }  else {
        // debug
        console.log("validateUpdate(): Validation failed - bad id");
    }

    // return new validated product object
    return validated_product;
}




// Module exports
// expose these functions
module.exports = {
  validateNewProduct,
  validateUpdate
}