const db = require("../models/index");
const { Comment, Post } = db.sequelize.models;

//creation commentaire
exports.createComment = async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (req.body.description !== "" && req.body.userId === req.token.userId) {
      await Comment.create({
        ...req.body,
        postId: req.params.postId,
        userId: req.token.userId,
      });
      await post.update(
        { commentsCount: post.commentsCount + 1 },
        { where: { id: req.params.postId } }
      );
      res.status(201).json({ message: "Commentaire envoyé" });
    } else {
      throw "Création de commentaire interdit";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

//modif commentaire
exports.modifyComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId },
    });
    if (req.body.description !== "" && req.token.userId === comment.userId) {
      await comment.update(req.body, { where: { id: req.params.commentId } });
      res.status(200).json({ message: "Commentaire modifié !" });
    } else {
      throw "Vous n'avez pas l'autorisation de modifier ce commentaire";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

//Delete com
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId },
    });
    const post = await Post.findOne({ where: { id: req.params.postId } });

    if (comment.userId === req.token.userId || req.token.isAdmin) {
      await post.update(
        { commentsCount: post.commentsCount - 1 },
        { where: { id: req.params.postId } }
      );
      await comment.destroy({ where: { id: req.params.commentId } });
      res.status(200).json({ message: "Commentaire supprimé" });
    } else {
      throw "Vous n'avez pas l'autorisation pour supprimer ce commentaire";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

//récup tous les com
exports.getAllCommentsOfPost = (req, res, next) => {
  const options = {
    where: { postId: req.params.postId },
    include: db.User,
    order: [["id", "ASC"]],
  };

  if (req.query.limit) {
    options.order = [["id", "ASC"]];
    options.limit = parseInt(req.query.limit);
  }

  Comment.findAndCountAll(options)
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => res.status(404).json({ error }));
};

//recup com d'un user sur un post
exports.getOneCommentOfPost = (req, res, next) => {
  Comment.findOne({
    where: { postId: req.params.postId, id: req.params.commentId },
    include: db.User,
  })
    .then((comment) => res.status(200).json({ comment }))
    .catch((error) => res.status(404).json({ error }));
};
