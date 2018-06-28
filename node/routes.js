var app = require("../server.js");
var DiscordRPC = require("discord-rpc"); // ?????

// DiscordRPC.register();
console.log(rpc); // undefined
var rpc = new DiscordRPC.Client({"transport": "ipc"});
// console.log(rpc); // RPCClient {domain: null _events: {},

// console.log(rpc["clientID"]); // null
// rpc.login("461029893858131968");

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

  if(rpc["clientID"] == null){
    console.log("Not currently playing, start anew");
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
    console.log("New message, same game");

    rpc.setActivity({
      "details"      : details,
      "state"        : state,
      "largeImageKey": "icon",
      "instance"     : false,
    });

  }else{
    console.log("Want to switch to a new game, DELETE and start anew");

    // rpc.destroy("Can I read this?");

    rpc.destroy(function(){
      console.log("!!!!!!!!!!!!!");
      // console.log(rpc);

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


    // rpc = null;
    // console.log(rpc); // undefined

    // rpc.login(id);

    // rpc.on("ready", () => {
    //   rpc.setActivity({
    //     "details"      : details,
    //     "state"        : state,
    //     "largeImageKey": "icon",
    //     "instance"     : false,
    //   });
    // });
  }

  // DiscordRPC.register("");
  // var rpc = new DiscordRPC.Client({"transport": "ipc"});
  // rpc.login(id);

  // rpc.on("ready", () => {

  // });

  ////////////////////////////////////////////////////////////////////////////////

  // setTimeout(function(){
  //   // console.log(rpc);
  //   console.log(rpc["clientID"]);

  //   // console.log("DELETE");
  //   // delete rpc;
  // }, 1000);

  res.json({"a":"b"});
});

app.get("/", function(req, res){
  res.render("index.ejs", app["data"]);
});
