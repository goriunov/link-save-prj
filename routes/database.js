var express = require('express');
var router = express.Router();
var LinksGroup = require('../models/linksGroup.model');
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');





router.use('/' , function (req ,res ,next) {
    jwt.verify(req.query.token , 'SecretForNow' , function (err , decoded){
        if(err) {
            return res.status(404).json({
                title: 'Wrong token',
                error: {message: 'Please login .....'}
            });
        }
        next();
    })
});

router.get('/get-data' , function(req , res  ,next){
    var decoded = jwt.decode(req.query.token);
    User.findOne({'_id':decoded.user._id} , 'links firstName lastName')
        .populate('links')
        .exec(function(err , result){
            if(!result){
                return res.status(404).json({
                    title: 'Not authorize',
                    error: {message: 'You are not authorized'}
                });

            }
            if(err) {
                return res.status(404).json({
                    title: 'Error ',
                    error: {message: 'Some thing gone wrong'}
                });
            }
           return res.status(200).json({
                message: 'Data is loaded',
                data: result
            })
        });
});


router.post('/edit' , function(req ,res ,next){
   LinksGroup.findOne({'_id': req.body._id} , function(err , doc){

       if(!doc){
           return res.status(404).json({
               title: 'Not authorize',
               error: {message: 'You are not authorized'}
           });

       }

       if(err){
           return res.status(404).json({
               title: 'Error',
               error: {message: 'Some thing gone wrong'}
           });
       }else{
           doc.groupName = req.body.groupName;
           doc.description = req.body.description;

           doc.save(function(err , done){

               if(err){
                   return res.status(404).json({
                       title: 'Error',
                       error: {message: 'Some thing gone wrong'}
                   });
               }else {
                   return res.status(200).json({
                       message: 'Updated'
                   });
               }
           });

       }
   });
});

router.post('/create-delete-edit-link' , function(req ,res ,next){
    LinksGroup.findOne({'_id': req.body._id} , function(err , doc){
        if(err){
            return res.status(404).json({
                title: 'Error',
                error: {message: 'Some thing gone wrong'}
            });
        }else{
            if(!doc){
                return res.status(404).json({
                    title: 'Not authorize',
                    error: {message: 'You are not authorized'}
                });

            }
            doc.links = req.body.links;
            doc.linkName = req.body.linkName;

            doc.save(function(err , done){

                if(err){
                    return res.status(404).json({
                        title: 'Error',
                        error: {message: 'Some thing gone wrong'}
                    });
                }else {
                    return res.status(200).json({
                        message: 'Link added'
                    });
                }
            });

        }

    });
});

router.post('/save' , function(req ,res ,next){

    var decoded = jwt.decode(req.query.token);

    User.findOne({'_id': decoded.user._id} , function(err , doc){
        if(err){
            return res.status(404).json({
                title: 'Error',
                error: {message: 'Some thing gone wrong'}
            });
        }else{
            if(!doc){
                return res.status(404).json({
                    title: 'Not authorize',
                    error: {message: 'You are not authorized'}
                });

            }
            console.log(req.body);
            var links = new LinksGroup({
                'groupName': req.body.groupName,
                'description': req.body.description,
                'linkName': req.body.linkName,
                'links': req.body.links,
                'user': doc
            });

            links.save(function (err, result) {
                if (err) {
                    res.status(404).json({
                        title: 'Error',
                        error: {message: 'Some thing gone wrong'}
                    })
                } else {
                    doc.links.push(result);
                    doc.save(function (err, done) {
                        if (err) {
                            return res.status(404).json({
                                title: 'Error',
                                error: {message: 'Some thing gone wrong'}
                            })
                        }
                        return res.status(200).json({
                            link: result,
                            message: 'Saved'
                        });
                    });
                }
            });
        }
    });
});


router.delete('/delete-content' , function(req ,res ,next){
    var decoded = jwt.decode(req.query.token);
    User.findOne({'_id':decoded.user._id} , function(err ,doc){
        if(!doc){
            return res.status(404).json({
                title: 'Not authorize',
                error: {message: 'You are not authorized'}
            });

        }
        for(var i = 0 ; i < doc.links.length ; i++){
            if(doc.links[i] == req.query.id) {
                doc.links.splice(i , 1);
                doc.save();
            }
        }
    });
    LinksGroup.remove({'_id': req.query.id} , function(err , data){
        if (err) {
            return res.status(404).json({
                title: 'Error',
                error: {message: 'Some thing gone wrong'}
            })
        }else{
            return res.status(200).json({
                message: 'Deleted'
            });
        }
    });
});

module.exports = router;