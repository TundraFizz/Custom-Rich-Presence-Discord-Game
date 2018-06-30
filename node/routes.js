var app        = require("../server.js");
var fs         = require("fs");
var DiscordRPC = require("rich-presence-test");
var rpc        = new DiscordRPC.Client({"transport": "ipc"});

var details = null;
var state   = null;

app.post("/test", function(req, res){
  var id      = req["body"]["id"];
  // var details = req["body"]["top"];
  // var state   = req["body"]["bot"];

  var activity = {
    "largeImageKey": "icon",
    "instance"     : false
  };

  if(req["body"]["top"] != "")
    activity["details"] = req["body"]["top"];

  if(req["body"]["bot"] != "")
    activity["state"] = req["body"]["bot"];


  // if(details) activity["details"] = details;
  // if(state)   activity["state"]   = state;

  console.log(activity);

  if(rpc["clientID"] == null){
    // New game from no game
    rpc.login(id);

    rpc.on("ready", () => {
      rpc.setActivity(activity);
    });

  }else if(rpc["clientID"] == id){
    // Change message for the current game
    rpc.setActivity(activity);
  }else{
    // Switch to a new game
    rpc.destroy(function(){
      rpc = new DiscordRPC.Client({"transport": "ipc"});
      rpc.login(id);

      rpc.on("ready", () => {
        rpc.setActivity(activity);
      });
    });
  }

  res.json({});
});

app.post("/stop", function(req, res){
  if(rpc["clientID"]){
    rpc.destroy();
    rpc["clientID"] = null;
  }

  res.json({});
});

app.get("/", function(req, res){
  res.render("index.ejs", {"games": app["data"]});
});
