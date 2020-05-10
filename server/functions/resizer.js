// var fs = require("fs");
// const sharp = require("sharp");
// let input = [__dirname, "\\", "pics_small"].join(""),
//   output = [__dirname, "\\", "pics_mini"].join("");
// fs.readdir(input, function(err, files) {
//   files.forEach(file => {
//     console.log(file);
//     sharp(input + "\\" + file)
//       .resize(72, null)
//       .toFile(output + "\\" + file)
//       .then(function(newFileInfo) {
//         console.log("Image Resized");
//       })
//       .catch(function(err) {
//         console.log("Got Error");
//       });
//   });
// });
