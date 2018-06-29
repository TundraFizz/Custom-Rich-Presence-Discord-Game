var nexe = require("nexe");

nexe.compile({
  output: "yolo-swag",
  target: "windows-x86-9.11.1",
  resources: ["./views/*.ejs", "./static/**/*"],
  ico: "./build/icon.png",
  build: true
});
