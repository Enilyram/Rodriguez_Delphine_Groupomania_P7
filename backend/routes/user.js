//Routes user

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

// middleware authentification et gestion fichiers entrants

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

// routes connexions

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// routes gestion utilisateurs

router.get("/user-profile/:userId", userCtrl.getOneUser);
router.put("/user-profile/:userId", auth, multer, userCtrl.editUser);
router.put("/user-profile/settings/:userId", auth, userCtrl.changePassword);
router.delete("/user-profile/:userId", auth, userCtrl.deleteUser);

module.exports = router;
