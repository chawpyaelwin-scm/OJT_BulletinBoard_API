const UserModel = require("./user");
const PostModel = require("./post");
const TokenModel = require("./token");

module.exports = {
  User: UserModel,
  Post: PostModel,
  Token: TokenModel
};
