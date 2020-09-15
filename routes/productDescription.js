const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeProductListing(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('shop');
    const collection = db.collection('products');
    const productID= req.query.productID; //the product's id passed from the productListing page

    collection.findOne({id: productID}, (colErr, item) => {
      res.render('productDescription', {
        // Underscore.js lib
        _,
        title: "/productListing",
        item,
      });
      client.close();
    });
  });
};