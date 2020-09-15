const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeCategoriesMens(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('shop');
    const collection = db.collection('categories');
    const passedCategoryID = req.query.categoryID;

    collection.findOne({id: passedCategoryID}, (collErr, item) => {
      res.render('categories', {
        // Underscore.js lib
        _,

        title: 'categories',
        url: 'categories?categoryID='.concat(passedCategoryID),
        item,
      });
      client.close();
    });
  });
};