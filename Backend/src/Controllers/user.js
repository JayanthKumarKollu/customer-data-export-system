const userDetails = require("../Models/userDetails");

const addUserDetails = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].toUpperCase();
      }
    });
    const user = await userDetails.findOne({ name: req.body.name });
    if (!user) {
      await userDetails.insertOne(req.body);
      res.status(200).json({ msg: "User added Successfully." });
    } else {
      res.status(400).json({ msg: "User already exist." });
    }
  } catch (error) {
    res.status(500).json({ mesg: error });
  }
};

module.exports = { addUserDetails };
