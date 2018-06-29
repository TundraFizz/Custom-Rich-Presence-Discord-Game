var nexe = require("nexe");

nexe.compile({
  output: "yolo-swag",
  target: "win32-x86-8.11.3",
  resources: ["./views/*.ejs", "./static/**/*"],
  ico: "./build/icon.png",
  build: true
});
