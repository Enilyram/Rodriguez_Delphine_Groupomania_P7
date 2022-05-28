<!-- outil pour modifier son profil -->

<template>
  <div>
    <h1>Modification du profil</h1>

    <!-- changer les infos générales -->
    <b-card class="mb-3 shadow d-flex align-items-center">
      <h2>Informations générales</h2>
      <b-form @submit.prevent="update" class="form-w">
        <b-form-group class="mb-3">
          <ProfileImage imageHeight="70" :imageUrl="profilePhoto" class="profileImage" alt="mon avatar" />
          <label for="edit-profile-input" role="button" class="profile-image-change">Changer sa photo de profil</label>
          <input type="file" id="edit-profile-input" name="image" accept=".jpg, .jpeg, .png" autocomplete="photo"
            @change="updateProfileImage()" hidden />
        </b-form-group>

        <b-form-group class="mb-3">
          <label for="first-name">Prénom</label>
          <b-form-input class="shadow" v-model="form.firstName" type="text" id="first-name">
          </b-form-input>
        </b-form-group>

        <b-form-group class="mb-3"><label for="last-name">Nom</label>
          <b-form-input class="shadow" v-model="form.lastName" type="text" id="last-name">
          </b-form-input>
        </b-form-group>

        <b-form-group class="mb-3">
          <label for="profession">Profession</label>
          <b-form-input class="shadow" v-model="form.profession" type="text" placeholder="Job dans l'entreprise" id="profession">
          </b-form-input>
        </b-form-group>

        <b-form-group class="mb-3">
          <label for="description">Bio</label>
          <b-form-input class="shadow" v-model="form.userDescription" type="text"
            placeholder="Dîtes-en un peu plus sur vous" id="description">
          </b-form-input>
        </b-form-group>

        <p class="text-danger small">{{ errorMessage }}</p>

        <b-button pill class="m-1" @click="cancel">Retour</b-button>
        <b-button pill class="m-1" type="submit">Modifier</b-button>
      </b-form>
    </b-card>

    <!-- changer le mot de passe 

    <b-card class="mb-3 shadow d-flex align-items-center">
      <h2>Mot de passe</h2>

      <b-form @submit.prevent="changePassword" class="form-w">
        <b-form-group>
          <label for="password">Ancien mot de passe</label>
          <b-form-input class="shadow" v-model="passwordChangeForm.currentPassword" type="password" id="password">
          </b-form-input>
        </b-form-group>

        <b-form-group>
          <label for="passwordNew">Nouveau mot de passe</label>
          <b-form-input class="shadow" v-model="passwordChangeForm.newPassword" type="password" id="passwordNew">
          </b-form-input>
        </b-form-group>

        <b-form-group>
          <label for="passwordNewConfirm">Vérification nouveau mot de passe</label>
          <b-form-input class="shadow" v-model="passwordChangeForm.newPasswordConfirm" type="password"
            id="passwordNewConfirm">
          </b-form-input>
        </b-form-group>

        <p class="text-danger small">{{ errorMessage }}</p>

        <b-button pill class="m-1" @click="cancel">Retour</b-button>
        <b-button pill class="m-1" type="submit">Modifier</b-button>
      </b-form>
    </b-card> -->

    <!-- supprimer le compte -->
    <b-card class="mb-3 shadow d-flex align-items-center">
      <h2>Supprimer le compte</h2>
      <b-form @submit.prevent="deleteUser">
        <b-form-group>
          <label for="delete">Pour supprimer votre compte veuillez saisir "JE VOUS QUITTE"</label>
          <b-form-input v-model="deleteUserForm" type="text" id="delete" class="center shadow"></b-form-input>
        </b-form-group>
        <p class="text-danger small">{{ errorMessageDelete }}</p>

        <b-button pill class="m-1" @click="cancel">Retour</b-button>
        <b-button pill class="m-1" type="submit">Supprimer</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { apiFetch } from "../utils/ApiFetch";
import router from "../router/index";
import ProfileImage from "../components/ProfileImage.vue";

export default {
  name: "EditProfile",

  components: {
    ProfileImage,
  },

  data() {
    return {
      deleteUserForm: "",
      profilePhoto: "",
      user: JSON.parse(localStorage.getItem("userData")),
      form: {
        firstName: "",
        lastName: "",
        profession: "",
        userDescription: "",
      },
      passwordChangeForm: {
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      },
      errorMessage: "",
      errorMessageDelete: "",
    };
  },

  mounted() {
    this.profilePhoto = this.user.profilePhoto;
    this.form.firstName = this.user.firstName;
    this.form.lastName = this.user.lastName;
    this.form.profession = this.user.profession;
    this.form.userDescription = this.user.userDescription;
  },

  methods: {
    updateProfileImage() {
      const profileImage = document.querySelector(".profileImage");
      const inputImage = document.getElementById("edit-profile-input");
      let currentFile = inputImage.files;
      profileImage.src = window.URL.createObjectURL(currentFile[0]);
    },

    cancel() {
      this.$emit("returnShow", { mode: "show" });
    },

    update() {
      const selectedFile = document.getElementById("edit-profile-input");
      let profileImage = selectedFile.files;
      const isFormData = profileImage.length > 0;

      let body = this.form;
      console.log(body);

      if (isFormData) {
        const formData = new FormData();
        formData.append("image", profileImage[0]);
        formData.append("user", JSON.stringify(body));
        body = formData;
      }

      apiFetch
        .put(`/auth/user-profile/${this.user.id}`, body, { isFormData })
        .then((res) => {
          if (!res.error) {
            localStorage.setItem("userData", JSON.stringify(res.user));
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.$emit("returnShow", { mode: "show" });
    },

    //--changement de mdp

    changePassword() {
      if (
        this.passwordChangeForm.newPassword ==
        this.passwordChangeForm.newPasswordConfirm
      ) {
        apiFetch
          .put(`/auth/user-profile/settings/${this.user.id}`, {
            currentPassword: this.passwordChangeForm.currentPassword,
            newPassword: this.passwordChangeForm.newPassword,
          })
          .then((res) => {
            if (!res.error1) {
              localStorage.clear();
              router.push({ name: "login" });
            } else {
              this.errorMessage = "Le mot de passe actuel est faux.";
            }
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errorMessage =
          "Les nouveaux mots de passe doivent etre identiques.";
      }
    },

    //--suppression du compte

    deleteUser() {
      if (this.deleteUserForm == "JE VOUS QUITTE") {
        apiFetch.delete(`/auth/user-profile/${this.user.id}`).catch((error) => {
          console.log(error);
        });
        localStorage.clear();
        router.push({ name: "login" });
      } else {
        this.errorMessageDelete = "JE VOUS QUITTE doit etre saisi. ";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-w {
  max-width: 300px;
}

.form-w2 {
  max-width: 150px;
}

.profile-image-change {
  padding-left: 10px;
}
</style>
