const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

exports.valid = (req, res, next) => {
    // on vérifie le password et l'email
    const passwordSchema = new passwordValidator();
    passwordSchema
        .is().min(6)                                    // Minimum length 6
        .is().max(20)                                  // Maximum length 20
        .has().uppercase(1)                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


    if (
        !emailValidator.validate(req.body.email) ||
        !passwordSchema.validate(req.body.password)
    ) {
        return res.status(400).send({
            error:
                "Merci de vérifier ton adresse mail, ton mot de passe doit contenir au minum 6 caractères avec 1 chiffre et 1 majuscule  ",
        });
    } else if (
        emailValidator.validate(req.body.email) ||
        passwordSchema.validate(req.body.password)
    ) {
        next();
    }
};
