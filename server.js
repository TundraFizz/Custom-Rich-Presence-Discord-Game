require("ejs");
var fs         = require("fs");
var yaml       = require("js-yaml");
var express    = require("express");         // Define the web framework
var bodyParser = require("body-parser");     // Allows you to read POST data
var app        = module.exports = express(); // Define the application
app.set("views", "./views");                 // Define the views directory
app.use(express.static("./static"));         // Define the static directory
app.use(bodyParser.urlencoded({extended: true})); // Setting for bodyParser

fs.readFileSync("./views/index.ejs"     , "utf-8");
fs.readFileSync("./static/css/index.css", "utf-8");
fs.readFileSync("./static/img/icon.jpg" , "utf-8");
fs.readFileSync("./static/js/index.js"  , "utf-8");

fs.access("config.yml", function(err){
  // Check to see if a custom config file exists
  // If it does, then load it. Otherwise, just use the default values
  if(err){
    module.exports.data = [{
      "name": "splatoon2",
      "id": "461029893858131968",
      "top": ["splat top 1", "splat top 2"],
      "bot": ["splat bot 1", "splat bot 2"]
    },{
      "name": "zeldabotw",
      "id": "461408978400706570",
      "top": ["botw top 1", "botw top 2"],
      "bot": ["botw bot 1", "botw bot 2"]
    },{
      "name": "ssbu",
      "id": "461414353791483904",
      "top": ["ssbu top 1", "ssbu top 2"],
      "bot": ["ssbu bot 1", "ssbu bot 2"]
    }];

    require("./node/routes.js"); // Include web routes third
    app.listen(80);              // Start the server
  }else{
    fs.readFile("config.yml", "utf-8", function(err, data){
      var doc = yaml.load(data);
      module.exports.data = doc;

      require("./node/routes.js"); // Include web routes third
      app.listen(80);              // Start the server
    });
  }
});
