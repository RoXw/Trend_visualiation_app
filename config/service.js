var env 	= process.env.NODE_ENV || "development";
var config 	= require(__dirname + '/../config/config.json')[env];

var AppConfig = function(){
    this.getProperty = function(key){
        return config[key];
    };
    this.setProperty = function(key, value){
        config[key] = value;
    };
};

module.exports = new AppConfig();

