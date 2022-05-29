const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const { User } = db.sequelize.models;

// Definition du token et et de l'userID
const newToken = (user) => {
  token = jwt.sign(
    { userId: user.id, isAdmin: user.admin },
    `${process.env.TOKEN_KEY}`,
    { expiresIn: "24h" }
  );
  return { user, userId: user.id, isAdmin: user.admin, token };
};

// Definition de la logique pr enregistrer un nouvel utilisateur
exports.signup = (req, res, next) => {
  // hash du mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          res.status(201).json(newToken(user));
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Definition de la logique pour la co d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "L'utilisateur n'existe pas" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mauvais mot de passe" });
          }
          res.status(201).json(newToken(user));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Definition de la logique pr obtenir les infos utilisateur
exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.userId } })
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(404).json({ error }));
};

// Definition de la logique pr modif les infos generales
exports.editUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (req.token.userId === user.id) {
      let userObject = req.body;
      if (req.body.password) {
        throw "Mauvais endroit";
      }
      if (req.files) {
        userObject = JSON.parse(req.body.user);
        userObject.profilePhoto = `${req.protocol}://${req.get(
          "host"
        )}/images/${req.files[0].filename}`;
      }
      await user.update(
        { ...userObject },
        { where: { id: req.params.userId } }
      );
      res.status(200).json({ message: "Profil modifié", user });
    } else {
      throw "Vous ne pouvez pas modifier ce profil";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Definition de la logique pr sup utilisateur
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (user.id === req.token.userId) {
      await user.destroy();
      res.status(200).json({ message: "Profil supprimé" });
    } else {
      throw "Vous ne pouvez pas supprimer ce profil";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};