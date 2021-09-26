const debug = require("debug")("userController");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

async function getHome(req, res) {
  try {
    const decodedToken = jwt.verify(req.cookies.jwt, "secret");
    let userName;
    const user = await User.findById(decodedToken.userId);

    if (user) {
      userName = user;
    } else {
      userName = "";
    }

    res.render("home", { user: userName });
  } catch (error) {
    res.redirect("/login");
  }
}

function getLogin(req, res) {
  res.render("login");
}

function getRegister(req, res) {
  res.render("register");
}

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      email,
      password,
      name,
    });
    await newUser.save();
    delete newUser.password;

    return res.status(201).json({ ok: true, newUser });
  } catch (error) {
    debug(error);
  }
}

async function UserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      ok: false,
      message: "No user exist with this email",
    });
  }
  if (user.password !== password) {
    return res.status(404).json({
      ok: false,
      message: "password does not match",
    });
  }
  const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
  res.header("Authorization", `Bearer ${token}`);
  res.cookie("jwt", token);

  res.status(200).json({
    ok: true,
    user,
  });
}
function logout(req) {
  console.log(req);
}

module.exports = {
  getRegister,
  getLogin,
  getHome,
  createUser,
  UserLogin,
  logout,
};
