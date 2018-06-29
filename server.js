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
  // Check to see if config.yml already file exists for the application to read data from
  // If it doesn't exit, copy from the default configuration file and read that instead
  if(err){
    var rs = fs.createReadStream("./static/config.yml");
    var ws = fs.createWriteStream("./config.yml");
    rs.pipe(ws);
    ws.on("close", function(){
      StartServer();
    });
  }else
    StartServer();
});

function StartServer(){
  fs.readFile("config.yml", "utf-8", function(err, data){
    var doc = yaml.load(data);
    module.exports["data"] = doc;

    require("./node/routes.js");
    app.listen(80);
    console.log("The application is now running");
    console.log("Go to \"localhost\" in your browser");
  });
}
