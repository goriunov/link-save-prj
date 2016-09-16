var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linksGroup = new Schema({
    'groupName' : {type: String , required: true},
    'description': {type: String},
    'linkName': [{type: String }],
    'links': [{type: String }],
    'user': {type: Schema.Types.ObjectId , ref: 'User'}
});

module.exports = mongoose.model('LinksGroup' , linksGroup);

