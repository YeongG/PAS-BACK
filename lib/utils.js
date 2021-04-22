const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const checkIncludeEmpty = (data) => {
  for (let key in data) {
    if (!data[key]) throw { emptyKey: key, message: `${key} is Empty` };
  }
  return false;
};

const makeHashPassword = (password) => {
  return crypto.createHash("sha512").update(password).digest("base64");
};

const makeAccessJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const decodeJwt = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    throw new Error("Decode fail");
  }
};

module.exports = {
  checkIncludeEmpty,
  makeHashPassword,
  makeAccessJWT,
  decodeJwt,
};
