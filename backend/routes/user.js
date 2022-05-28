//Routes user

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const authUser = require("../middleware/authUser");
// middleware authentification et gestion fichiers entrants
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

// routes connexions
router.post("/signup", authUser.valid, userCtrl.signup);
router.post("/login", userCtrl.login);

// routes gestion utilisateurs
router.get("/user-profile/:userId", userCtrl.getOneUser);
router.put("/user-profile/:userId", auth, multer, userCtrl.editUser);
router.put("/user-profile/settings/:userId", auth);
router.delete("/user-profile/:userId", auth, userCtrl.deleteUser);

module.exports = router;
