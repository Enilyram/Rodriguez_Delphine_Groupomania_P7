Créez un réseau social d’entreprise - Groupomania

---

Front : A faire dans le dossier /front

npm install

Pour lancer l'application :
npm run serve

Pour couper l'application :
Ctrl + C

---

Back : A faire dans le dossier /back

Installation MySQL et création d'une BDD.

Création dossier /images

npm install

Création d'un fichier .env avec comme modele le fichier .env_sample

Pour la migration des tables vers la BDD locale :
npx sequelize-cli db:migrate

Pour la migration de certaines informations dans la BDD:
npx sequelize-cli db:seed:all

Les informations migrées sont:

- utilisateur admin // mail:admin@groupomania.com password:AdministratoR2022\*

Pour lancer le serveur :
node server

Pour couper le serveur :
Ctrl + C
