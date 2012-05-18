
exports.port =(process.env.VMC_APP_PORT || 8888);
exports.host = (process.env.VCAP_APP_HOST || 'localhost');
exports.email='tuong.dangman@gmail.com';
exports.site_name = 'SA4U';
exports.site_desc = '';
exports.session_secret = 'tsoedsosisession_secretonsheecfrxedta';

if(process.env.VCAP_SERVICES){
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['mongodb-1.8'][0]['credentials'];
}
else{
  var mongo = {
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"", 
    "name":"",
    "db":"mydb"
  }
}


var db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'nodejs_example'
};

var generate_mongo_url = function(obj){
  obj.hostname = (obj.hostname || 'localhost');
  obj.port = (obj.port || 27017);
  obj.db = (obj.db || 'test');

  if(obj.username && obj.password){
    return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
  else{
    return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
}

var mongourl = generate_mongo_url(mongo);

var mongoose = new require('mongoose/'),
    db = mongoose.connect(mongourl);

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema ({
    username : String,
    password: String
    
});
    
var UserModel = mongoose.model('User',UserSchema);    
    

exports.db = db
exports.mongoose = mongoose;
exports.UserModel = UserModel;
