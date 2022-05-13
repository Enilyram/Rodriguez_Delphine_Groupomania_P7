//Routes posts

const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/posts");

// middleware authentification, gestion fichiers entrants

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

// Routes CRUD

router.post("/", auth, multer, postsCtrl.createPost);
router.put("/:id", auth, multer, postsCtrl.modifyPost);
router.delete("/:id", auth, postsCtrl.deletePost);
router.get("/", auth, postsCtrl.getAllPosts);
router.get("/:id", auth, postsCtrl.getOnePost);

module.exports = router;
