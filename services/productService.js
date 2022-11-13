// Product service functions

const productData = require('../dataAccess/productData');

// Import dependencies

// Validation
const validate = require('../validators/baseValidators');
const productValidator = require('../validators/productValidator');

// Function to get all products
//
async function getProducts() {
    
    // a place holder for now 
    const products = await productData.getProducts();
  
    // return products
    return products;
  }
  

// Function to get product by id
//
async function getProductById(id) {
  // validate the id
  const validated_id = validate.validateId(id);

  if (validated_id) {
    // Call the data access function to get product with matching id
    const product = await productData.getProductById(validated_id);

    // return the product
    return product;
  } else {
    return "get product by id service - Invalid product id";
  }
}

// Function to get products in a specified category (by category id)
//
async function getProductsByCatId(id) {

    // validate the id
    const validated_id = validate.validateId(id);
  if (validated_id) {

    // Call the data access function to get product matching id
    const products = await productData.getProductsByCatId(validated_id);

    // return the products found
    return products;

  } else {
      return "get by cat service - Invalid product id";
  }
}

// This function accepts product data which it validates.
// If validation passes then pass the new product data to the data access layer
async function addNewProduct(product_data) {

  // declare variables
  let result;

    // Call the product validator - kept seperate to avoid clutter here
    let validated_product = productValidator.validateNewProduct(product_data); 

    // If validation returned a product object - save to database
    if (validated_product) {
      // Insert
      result = await productData.createProduct(validated_product);

      return {
        product: result,
        message: `product added with id: ${result.id}`
      }
    
    } else {
      return {
        product: product_data,
        message: 'add product service - invalid product data'
      }
    }
}


// This function accepts product data which it validates.
// If validation passes then pass the product data to the data access layer
async function updateProduct(product_data) {

  // declare variables
  let result;

    // Call the product validator - kept seperate to avoid clutter here
    let validated_product = productValidator.validateUpdate(product_data); 

    // If validation returned a product object - save to database
    if (validated_product) {
      // Insert
      result = await productData.createProduct(validated_product);

      return {
        product: result,
        message: `product with id: ${result.id} updated`
      }

      return result;
    
    } else {
      return {
        product: product_data,
        message: 'update product service - invalid product data'
      }
    }
}


// 
// Function to delete product by id
//
async function deletetProductById(id) {
  // validate the id
  const validated_id = validate.validateId(id);

  if (validated_id) {
    // Call the data access function to get product with matching id
    const product = await productData.deletetProductById(validated_id);

    // return the product
    return product;
  } else {
    return "delete service - Invalid product id";
  }
}



// Module exports
// expose these functions
module.exports = {
    getProducts,
    getProductById,
    getProductsByCatId,
    addNewProduct,
    updateProduct,
    deletetProductById
};


