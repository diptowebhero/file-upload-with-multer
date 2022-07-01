const express = require("express");
const multer = require("multer");

const app = express();

//uploads folder
const UPLOAD_FOLDER = "./uploads";

const upload = multer({
  dest: UPLOAD_FOLDER,
});

//application route

//single file upload
app.post("/", upload.single("avatar"), (req, res) => {
  res.send("Hello Node JS");
});

//multiple file upload with single field
// app.post("/", upload.array("avatar", 3), (req, res) => {
//   res.send("Hello");
// });

//multiple fields upload
// app.post(
//   "/",
//   upload.fields([
//     { name: "avatar", maxCount: 2 },
//     { name: "gallery", maxCount: 3 },
//   ]),
//   (req, res) => {
//     res.send("Hello");
//   }
// );

//Handle form data
// app.post("/", upload.none(), (req, res) => {
//   console.log(req.body.name);
//   res.send("Hello");
// });

app.listen(5000, () => {
  console.log("Server is running successfully");
});
