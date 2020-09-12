const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeCategoriesMens(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('shop');
    const collection = db.collection('categories');

    collection.find({id: "mens"}, {}).toArray((collErr, items) => {
      res.render('categoriesMens', {
        // Underscore.js lib
        _,

        // Template data
        title: 'categoriesMens',
        items,
      });
      client.close();
    });
  });
};
