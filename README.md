# Projet 7 de la formation Web Developpeur OpenClassroom, Groupomania

## Backend :
Si vous n'avez MySql installez le.
### Ouvrir un terminal 
- ``cd backend``
- ``npm install``
- Modification du fichier .env_exemple en .env en modifiant le contenu avec les informations adéquates
- Création de la base de données:
- ``sequelize db:create``
#### Migration de la structure de la base de données :
- ``npx sequelize db:migrate``
#### Migration des infos modérateurs:
- ``npx sequelize-cli db:seed:all``

### Lancez le server :
- ``node server``


## Frontend
### Ouvrir un nouveau terminal
- ``cd frontend``
- ``npm install``
- ``npm run serve``


## Infos
Modérateur :  
- Email : modo@groupomania.fr
- Mot de passe : c'estMoileb055
