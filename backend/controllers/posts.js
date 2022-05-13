// logique metier appliquee aux routes posts

const db = require("../models/index");
const { Post } = db.sequelize.models;
const fs = require("fs");

// logique metier creation publication

exports.createPost = async (req, res, next) => {
  try {
    let postObject = req.body;
    postObject.imageUrl = "[]";
    if (req.files && req.files.length != 0) {
      postObject = JSON.parse(req.body.post);
      let imageUrlList = [];
      for (let i = 0; i < req.files.length; i++) {
        let fileUrl;
        fileUrl = `${req.protocol}://${req.get("host")}/images/${
          req.files[i].filename
        }`;
        imageUrlList.push(fileUrl);
      }
      postObject.imageUrl = JSON.stringify(imageUrlList);
    }
    if (req.body.description !== "" && postObject.userId === req.token.userId) {
      let post = await Post.create({ ...postObject });
      post = await Post.findOne({ where: { id: post.id }, include: db.User });
      res.status(201).json({ message: "Publication enregistrée !", post });
    } else {
      throw "création de post non autorisée";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// logique metier modifi publication

exports.modifyPost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      let postObject = req.body;
      if (req.files && req.files.length != 0) {
        postObject = JSON.parse(req.body.post);
        const oldImageUrlList = JSON.parse(post.imageUrl);
        for (let i = 0; i < oldImageUrlList.length; i++) {
          const filename = oldImageUrlList[i].split("/images/")[1];
          fs.unlink(`images/${filename}`, (err) => {
            console.log(err);
          });
        }
        let imageUrlList = [];
        for (let i = 0; i < req.files.length; i++) {
          let fileUrl;
          fileUrl = `${req.protocol}://${req.get("host")}/images/${
            req.files[i].filename
          }`;
          imageUrlList.push(fileUrl);
        }
        postObject.imageUrl = JSON.stringify(imageUrlList);
      } else {
        postObject.imageUrl = post.imageUrl;
        if (!req.body.description && postObject.imageUrl === "[]") {
          throw "Une publication vide ne peut être postée";
        }
      }
      if (post.userId === req.token.userId) {
        Post.update({ ...postObject }, { where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: "Publication modifiée !" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(401).json({
          error: "vous n'êtes pas autorisé à modifier cette publication",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// logique metier suppression publication

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.userId === req.token.userId || req.token.isAdmin) {
        const imageUrlList = JSON.parse(post.imageUrl);
        for (let i = 0; i < imageUrlList.length; i++) {
          const filename = imageUrlList[i].split("/images/")[1];
          fs.unlink(`images/${filename}`, (err) => {
            console.log(err);
          });
        }
        Post.destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: "Publication supprimée" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(401).json({
          error: "Vous n'avez pas l'autorisation de supprimer cette publication",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//logique metier pour voir tte les publi

exports.getAllPosts = (req, res, next) => {
  const options = {
    include: db.User,
    order: [["id", "DESC"]],
  };

  if (req.query.userId) {
    options.where = {
      userId: parseInt(req.query.userId),
    };
  }
  Post.findAll(options)
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(404).json({ error }));
};

// logique metier pour obtenir une publication

exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id }, include: db.User })
    .then((post) => res.status(200).json({ post }))
    .catch((error) => res.status(404).json({ error }));
};
