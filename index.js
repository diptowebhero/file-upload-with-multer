const express = require("express");
const multer = require("multer");
const path = require("path");

//app object
const app = express();

//file upload folder
const UPLOAD_DESTINATION = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DESTINATION);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now() +
      fileExt;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000, //1mb
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg .jpg & .png file allowed"));
    }
  },
});

//application route
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/profile", upload.single("avatar"), (req, res) => {
  res.send("File uploaded successfully");
});

//default error handler
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was an upload err");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("success");
  }
});

app.listen(5000, () => {
  console.log("Server is running successfully");
});

