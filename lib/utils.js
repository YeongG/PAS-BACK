const crypto = require("crypto");

const checkIncludeEmpty = (data) => {
  for (let key in data) {
    if (!data[key]) throw { emptyKey: key, message: `${key} is Empty` };
  }
  return false;
};

const makeHashPassword = (password) => {
  return crypto.createHash("sha512").update(password).digest("base64");
};

module.exports = {
  checkIncludeEmpty,
  makeHashPassword,
};
