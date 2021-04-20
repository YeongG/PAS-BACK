const express = require("express");
const { checkBody } = require("../../middlewares");
const { makeHashPassword } = require("../../lib/utils");
const { User } = require("../../models");

const authRouter = express.Router();

authRouter.post(
  "/register",
  checkBody(["id", "password", "name"]),
  async (req, res) => {
    const { id, password, name } = req.body;
    const hashPassword = makeHashPassword(password);
    try {
      await User.create({ id, password: hashPassword, name });
      res.status(201).json({ message: "Created Success" });
      return;
    } catch (err) {
      res.status(409).json({ message: "중복된 ID가 존재합니다" });
    }
  }
);

module.exports = authRouter;
