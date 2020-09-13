// module.exports = function routeIndex(req, res) {
//     res.render('productListing', {
//     // Template data
//       title: 'Product Listing',
//     });
//   };
  

const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeProductListing(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('shop');
    const collection = db.collection('products');
    const passedPrimaryCategoryId = req.query.subcategory;
    var regularExpression = new RegExp("^" + passedPrimaryCategoryId);

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
