const express = require("express");
const cors = require("cors");
const fs = require("fs");
const upload = require("./lib/upload");
const app = express();

const exampleJson = JSON.parse(
  fs.readFileSync(__dirname + "/lib/example.json").toString()
);

require("dotenv").config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/analysis", upload.single("image"), (req, res, next) => {
  const uploadFilePath = `${__dirname}/${req.file.path}`;

  const uploadFileBuffer = fs.readFileSync(uploadFilePath);
  console.log(exampleJson);
  fs.unlinkSync(uploadFilePath);
  res.json(exampleJson);
});

app.listen(PORT, () => {
  console.log(`Server is Open Port : ${PORT}`);
});
