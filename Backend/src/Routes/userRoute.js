const express = require("express");
const route = express.Router();
const {addUserDetails} = require("../Controllers/user")

route.route("/").post(addUserDetails);

module.exports = route;
