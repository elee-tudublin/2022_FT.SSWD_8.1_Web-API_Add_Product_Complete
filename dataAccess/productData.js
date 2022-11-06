// Data access functions for products

// Import dependencies
const { PrismaClient } = require('@prisma/client');

// declare an instance of the client
const prisma = new PrismaClient();

// Get all products from DB
// https://www.prisma.io/client
async function getProducts() {
    // define variable to store products
    let products;

    try {  
        // Get all products
        // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
        products = await prisma.product.findMany({
                orderBy: {product_name: 'asc'}

    });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get products: ', err.message);
    } finally {

    }
    return products;
}


// Get product by id from DB
//
async function getProductById(id) {

    // Define variable
    let product;

    try {
        // use where with findUnique
        product = await prisma.product.findUnique ({
            where: {id: id}
        });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get product by id: ', err.message);
    } finally {

    }
    // return a single product if found
    return product;
}

// Get products from DB by cat id
//
async function getProductsByCatId(catId) {

    // define variable to store products returned
    let products;

    // execute the query to find products
    try {
        // find all products
        products = await prisma.product.findMany ({
            // where category_id = catId
            where: {category_id: catId},
            orderBy: {product_name: 'asc'} 
        });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get products by category: ', err.message);
    } finally {

    }
    // return all products found
    return products;
}

// Insert a new product into the database
// Return the result
//
async function createProduct(product) {
    let newProduct;

    // execute query using prisma.product.create
    // Note the data object
    try {
        // New product so no id
        newProduct = await prisma.product.create({
            data: {
                category_id: Number(product.category_id), 
                product_name: product.product_name, 
                product_description: product.product_description, 
                product_stock: Number(product.product_stock), 
                product_price: Number(product.product_price)
            }
        });

    // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - create product: ', err.message);
    } finally {

    }
    // return the new product
    return newProduct;
}

// Export 
module.exports = {
    getProducts,
    getProductById,
    getProductsByCatId,
    createProduct
};