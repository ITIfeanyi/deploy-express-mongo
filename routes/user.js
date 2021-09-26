const express = require("express");
const {
  createUser,
  getHome,
  getLogin,
  UserLogin,
  getRegister,
} = require("../controller/userController");

const router = express.Router();

router.get("/", getHome);

router.get("/login", getLogin);
router.post("/login", UserLogin);

router.get("/register", getRegister);
router.post("/register", createUser);
module.exports = router;
