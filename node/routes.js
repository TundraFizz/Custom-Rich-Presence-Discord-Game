var app = require("../server.js");
var DiscordRPC = require("discord-rpc"); // ?????

// DiscordRPC.register();
var rpc = new DiscordRPC.Client({"transport": "ipc"});
rpc.login("461029893858131968");

app.post("/test", function(req, res){
  // console.log(rpc);

  var id   = req["body"]["id"];
  var type = req["body"]["type"];
  var msg  = req["body"]["msg"];

  var details = "SAMPLE_TEXT";
  var state   = "SAMPLE_TEXT";

  if(type == "top") details = msg;
  if(type == "bot") state   = msg;

  ////////////////////////////////////////////////////////////////////////////////

  // DiscordRPC.register("");
  // var rpc = new DiscordRPC.Client({"transport": "ipc"});
  // rpc.login(id);

  // rpc.on("ready", () => {
    rpc.setActivity({
      "details"      : details,
      "state"        : state,
      "largeImageKey": "icon",
      "instance"     : false,
    });
  // });

  ////////////////////////////////////////////////////////////////////////////////

  setTimeout(function(){
    console.log("DELETE");
    delete rpc;
  }, 1000);

  res.json({"a":"b"});
});

app.get("/", function(req, res){
  res.render("index.ejs", app["data"]);
});
