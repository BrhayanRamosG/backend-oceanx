const db = require("../database/models");

const checkUser = async (username = "") => {
  const isUsername = await db.User.findOne({ where: { username } });
  if (isUsername) {
    throw new Error(`El usuario ${username}, ya está en uso.`);
  }
};

module.exports = {
  checkUser,
};
