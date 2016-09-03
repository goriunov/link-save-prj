var express = require('express');
var router = express.Router();
var MetaInspector = require('minimal-metainspector');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



router.get('/get-title/', function(req, res, next) {
  var client = new MetaInspector(req.query.link, {});
  console.log('works');
  client.on("fetch", function(){
    var details = {
      "title": client.title
    };
    console.log(details);
    res.json(details);
  });
  client.on("error", function(err){
    var details = {
      "title": "Link-Do-Not-Know-Title :)"
    };
    res.json(details);
    console.log('Cant load content');
  });

  client.fetch();
});



module.exports = router;
