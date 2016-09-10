var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linksGroup = new Schema({
    'email' : {type: String , required: true , unique: true},
    'password' : {type: String , required: true},
    'firstName': {type: String , required: true},
    'lastName': {type: String , required: true},
    'verified': {type: Boolean , required: true},
    'links': [{type: Schema.Types.ObjectId , ref: 'LinksGroup'}]
});

module.exports = mongoose.model('User' , linksGroup);

