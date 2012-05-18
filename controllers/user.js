
var config = require('../config'),
   UserModel = config.UserModel;

exports.index = function(req, res, next) {
    UserModel.find({}, function (err, rows) {
        if(err) return next(err);
        res.render('index', {users: rows});
    });
};    

exports.new = function(req, res, next) {
    var username = req.body.username || '';
    var password = req.body.password || '';
    username = username.trim();
    password = password.trim();
    
    if(!username && !password) {
        return res.render('error', {message: 'Username and password is required !!!'});
    }
    
    var u = new UserModel({username : [username], password : [password]});
    
    u.save( function (err) {
        
        if(err) return next(err);
        console.log('Success!!');
        res.redirect('/');
    });
        
};

exports.view = function(req, res, next) {
    res.redirect('/');
};

exports.edit = function(req, res, next) {
    var id = req.params.id;
    console.log('Success!!' + req.params.id);
    
    UserModel.find({ _id:[id]  }, function (err, rows) {
        if(err) return next(err);
        
        if(rows && rows.length > 0) {
            var row = rows[0];
            res.render('user/edit', {user: row});
        } else {
            next();
        }

    });
    
    /*db.query('select * from user where id=?', [id], function(err, rows) {
        if(err) return next(err);
        if(rows && rows.length > 0) {
            var row = rows[0];
            res.render('user/edit', {user: row});
        } else {
            next();
        }
    });*/
};

exports.save = function(req, res, next) {
    console.log('save!!');
    var id = req.params.id;
    var username = req.body.username || '';
    var password = req.body.password || '';
    username = username.trim();
    password = password.trim();
   
    if(!username && !password) {
        return res.render('error', {message: 'Username is required !!!'});
    }
    
    var conditions = { _id:[id] },
    update = { $set: { username: [username], password:[password] }},
    options = { multi: true };
    UserModel.update(conditions, update, options, 
    function(err, result) {
        if(err) return next(err);
        console.log('save success !!');
        res.redirect('/');
    });
    
    
};

/*exports.delete = function(req, res, next) {
    var id = req.params.id;
    var conditions = { _id:[id] },

    UserModel.find({ _id:[id]  }, function (err, rows) {
        if(err) return next(err);
        
        if(rows && rows.length > 0) {
            rows[0].remove();
            
        } else {
            next();
        }

    });
    
    /*UserModel.remove(conditions, 
    function(err) {
        if(err) return next(err);
        res.redirect('/');
    });
    
};*/

exports.finish = function(req, res, next) {
    var finished = req.query.status === 'yes' ? 1 : 0;
    var id = req.params.id;
    db.query('update user set actived=? where id=?', [finished, id], function(err, result) {
        if(err) return next(err);
        res.redirect('/');
    });
};