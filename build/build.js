var nexe = require("nexe");

nexe.compile({
  output: "yolo-swag",
  // target: "windows-x86-8.11.3",
  // target: "win32-x86-8.11.3",
  target: "win32-x64-9.11.1",
  resources: ["./views/*.ejs", "./static/**/*"],
  ico: "./build/icon.ico",
  build: true
});
