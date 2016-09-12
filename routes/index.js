var express = require('express');
var router = express.Router();
var MetaInspector = require('minimal-metainspector');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



router.get('/get-title/', function(req, res, next) {
  var client = new MetaInspector(req.query.link, {});
  console.log('Getting title');



  if(req.query.link == 'new'){
    res.status(200).json({
      'title': "Link somewhere"
    });

  }else{

    client.on("fetch", function () {
      if(client.title == ''){
        res.status(200).json({
          "title": 'Link no title'
        });
      }else {
        res.status(200).json({
          "title": client.title
        });
      }
    });

    client.on("error", function (err) {
      res.status(200).json({
        "title": "Link somewhere"
      });
    });
    client.fetch();

  }
});



module.exports = router;
