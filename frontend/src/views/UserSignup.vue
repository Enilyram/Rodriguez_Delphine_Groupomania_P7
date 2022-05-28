<!-- Nouveau compte -->

<template>
  <div>
    <HeaderAccueil />
    <b-container class="col-sm-8 col-md-4 col-xs-8">
      <b-row>
        <b-col class="d-sm-flex flex-column align-items-center text-center border border-secondary mt-5 shadow">
          <h1>Réseau social d'entreprise</h1><br> 
          <h2>Création de compte</h2>
          <b-form class="form-width my-3 mb-3" @submit.prevent="signup">
            <b-form-group class="mb-3">
              <div class="input-div" id="firstName">
                <label for="signup-firstname" class="text-left">Prénom</label>
                <b-form-input class="shadow" v-model="firstName" type="text" id="signup-firstname"></b-form-input>
              </div>
            </b-form-group>

            <b-form-group class="mb-3">
              <div class="input-div" id="lastName">
                <label for="signup-name" class="text-left">Nom</label>
                <b-form-input class="shadow" v-model="lastName" type="text" id="signup-name"></b-form-input>
              </div>
            </b-form-group>

            <b-form-group class="mb-3">
              <div class="input-div" id="email">
                <label for="signup-email" class="text-left">Email</label>
                <b-form-input class="shadow" v-model="email" type="email" autocomplete="email" id="signup-email">
                </b-form-input>
              </div>
            </b-form-group>

            <b-form-group class="mb-3">
              <div class="input-div" id="password">
                <label for="singup-password" class="text-left">Mot de passe</label>
                <b-form-input class="shadow" v-model="password" type="password" autocomplete="new-password"
                  id="singup-password">
                </b-form-input>
              </div>
            </b-form-group>

            <b-form-group class="mb-3">
              <div class="input-div" id="password">
                <label for="singup-password2" class="">Confirmation du mot de passe</label>
                <b-form-input class="shadow" v-model="password2" type="password" autocomplete="new-password"
                  id="singup-password2">
                </b-form-input>
              </div>
            </b-form-group><br>

            <p class="text-danger small">{{ errorMessage }}</p>

            <b-button pill class="m-1" @click="cancel">Retour</b-button>
            <b-button pill class="m-1" type="submit">Inscription</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { apiFetch } from "../utils/ApiFetch";
import router from "../router/index";
import HeaderAccueil from "../components/HeaderAccueil.vue"

export default {
  name: "SignUp",

  components: {
    HeaderAccueil,
  },

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },

      errorMessage: "",
    };
  },

  methods: {
    signup() {
      if (this.password == this.password2) {
        this.form.email = this.email;
        this.form.firstName = this.firstName;
        this.form.lastName = this.lastName;
        this.form.password = this.password;
        console.log(this.form);
        apiFetch
          .post("/auth/signup", this.form)
          .then((res) => {
            console.log("token:", res.token);
            if (!res.token) {
              this.errorMessage = "Erreur, email déjà utilisée ou mot de passe pas assez fort, ton mot de passe doit contenir au minum 6 caractères avec 1 chiffre et 1 majuscule ";
            } else {
              localStorage.setItem("userToken", res.token);
              localStorage.setItem("userData", JSON.stringify(res.user));
              router.push({ name: "groupomania" });
            }
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage = "Problèmes de connexion.";
          });
      } else {
        this.errorMessage =
          "La confirmation du mot de passe doit être identique.";
      }
    },
    cancel() {
      router.push({ name: "login" });
    },
  },
};
</script>
