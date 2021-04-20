module.exports = (keys) => (req, res, next) => {
  const body = req.body;
  const length = keys.length;

  for (let i = 0; i < length; i++) {
    const key = keys[i];
    if (body[key] === undefined) {
      res.status(400).json({
        message: `Bad Request : ${key} is empty`,
      });
      return;
    }
  }
  next();
};
