const express = require("express");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  console.log(req.body);

  res.send("");
});

module.exports = authRouter;
