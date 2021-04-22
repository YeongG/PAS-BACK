const express = require("express");
const { checkBody } = require("../../middlewares");
const { makeHashPassword, makeAccessJWT } = require("../../lib/utils");
const { User } = require("../../models");
const checkAuth = require("../../middlewares/checkAuth");

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

authRouter.post(
  "/login",
  checkBody(["id", "password"]),
  async (req, res, next) => {
    const { id, password } = req.body;

    const hashPassword = makeHashPassword(password);
    const user = await User.findOne({
      where: { id, password: hashPassword },
    });
    if (!user) {
      res
        .status(400)
        .json({ message: "아이디 또는 비밀번호가 일치하지 않습니다" });
      return;
    }

    const jwtAccess = makeAccessJWT(id);

    res.status(200).json({ accessToken: jwtAccess, message: "로그인 성공" });
    return;
  }
);

authRouter.get("/check", checkAuth, (req, res, next) => {
  res.send("");
});

module.exports = authRouter;
