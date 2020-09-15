const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeProductListing(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('shop');
    const collection = db.collection('products');
    const passedPrimaryCategoryId = req.query.subcategory; //"subcategory" is the string passed from the categoriesMens/Womens page
    var regularExpression = new RegExp("^" + passedPrimaryCategoryId); //creating a regex out of "subcategory" so that we can extract all products from their respective subcategory

    collection.find({primary_category_id: regularExpression}, {}).toArray((collErr, items) => {
      res.render('productListing', {
        // Underscore.js lib
        _,
        title: "/categoriesMens",
        items,
      });
      client.close();
    });
  });
};