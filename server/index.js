let express = require("express"),
  socket = require("socket.io"),
  app = express(),
  server = app.listen(8080, () => {
    console.log("Server working...");
  }),
  io = socket(server),
  artgame_link = "https://storage.googleapis.com/ygoprodeck.com/pics_artgame/",
  progress = 0,
  imgs_progress = 0,
  downloaded = [],
  seconds = 1,
  the_interval = seconds * 1000;

io.on("connection", con => {
  // Somebody Connected
  console.log("Someone Connected: " + con.id);
});

// const download = require("image-downloader");
// const cards = require("./cards.json")["data"];

// io.on("connection", con => {
//   console.log("Socket Connected", con.id);
//   con.on("startDownload", param => {
//     console.log("startDownload : " + param);
//     cards.forEach((card, i) => {});
//     // setInterval(function() {
//     //   let card = cards[progress],
//     //     id = card.id,
//     //     imgs = card.card_images;
//     //   downloadCard(id, imgs);
//     // }, the_interval);
//   });
// });

// let downloadCard = (id, imgs) => {
//   if (!downloaded.includes[id]) {
//     downloaded.push(id);
//     progress++;
//     io.sockets.emit("progress_updated", progress);
//     imgs.forEach(img => {
//       let downloads = [
//         {
//           url: img.image_url,
//           dest: "/cards/pics"
//         },
//         {
//           url: img.image_url_small,
//           dest: "/cards/pics_small"
//         },
//         {
//           url: artgame_link + img.id + ".jpg",
//           dest: "/cards/artgame"
//         }
//       ];
//       downloads.forEach((d, d_i) => {
//         download
//           .image(d)
//           .then(({ filename, image }) => {
//             imgs_progress++;
//             io.sockets.emit("imgs_progress_updated", progress);
//           })
//           .catch(err => io.sockets.emit("imgs_error", err));
//       });
//     });
//   }
// };
