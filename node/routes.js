var app        = require("../server.js");
var DiscordRPC = require("discord-rpc");
var rpc        = new DiscordRPC.Client({"transport": "ipc"});

app.post("/test", function(req, res){

  var id   = req["body"]["id"];
  var type = req["body"]["type"];
  var msg  = req["body"]["msg"];

  var details = "SAMPLE_TEXT";
  var state   = "SAMPLE_TEXT";

  if(type == "top") details = msg;
  if(type == "bot") state   = msg;

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
