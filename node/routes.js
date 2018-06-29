var app        = require("../server.js");
var DiscordRPC = require("rich-presence-test");
var rpc        = new DiscordRPC.Client({"transport": "ipc"});

app.post("/test", function(req, res){
  var id      = req["body"]["id"];
  var details = req["body"]["top"];
  var state   = req["body"]["bot"];

  if(rpc["clientID"] == null){
    // New game from no game
    rpc.login(id);

    rpc.on("ready", () => {
      rpc.setActivity({
        "details"      : details,
        "state"        : state,
        "largeImageKey": "icon",
        "instance"     : false,
      });
    });

  }else if(rpc["clientID"] == id){
    // Change message for the current game

    rpc.setActivity({
      "details"      : details,
      "state"        : state,
      "largeImageKey": "icon",
      "instance"     : false,
    });

  }else{
    // Switch to a new game
    rpc.destroy(function(){
      rpc = new DiscordRPC.Client({"transport": "ipc"});
      rpc.login(id);

      rpc.on("ready", () => {
        rpc.setActivity({
          "details"      : details,
          "state"        : state,
          "largeImageKey": "icon",
          "instance"     : false,
        });
      });
    });
  }

  res.json();
});

app.post("/stop", function(req, res){
  if(rpc["clientID"])
    rpc.destroy();
});

app.get("/", function(req, res){
  res.render("index.ejs", app["data"]);
});
