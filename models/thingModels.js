
var config = require('../config'),
    mongoose = config.mongoose;
  
    thing = mongoose.model('thing');

exports.index = function(req, res, next) {
    thing.find({}, function (err, result) {
        if(err) return next(err);
        res.render('index', {users: rows});
    });
}    