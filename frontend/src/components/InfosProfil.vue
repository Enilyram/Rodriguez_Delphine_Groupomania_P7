<!-- outil permetant d'avoir les informations sur un utilisateur -->

<template>
  <div>
    <h1>{{ userPageTitle }} <br> {{ user.firstName }} {{ user.lastName }}</h1>
    <ProfileImage imageHeight="200" :imageUrl="user.profilePhoto"
      :alt="`avatar de ${user.firstName} ${user.lastName}`" />

    <p> Prénom : {{ user.firstName }} <br> Nom de famille : {{ user.lastName }}</p>
    <p>Profession : {{ user.profession }}</p>
    <p> Bio : {{ user.userDescription }}</p>
  </div>
</template>

<script lang="ts">
import { apiFetch } from "../utils/ApiFetch";
import { eventBus } from "../main.js";
import ProfileImage from "../components/ProfileImage.vue";

export default {
  name: "InfosProfil",

  components: {
    ProfileImage,
  },

  data() {
    return {
      user: {},
    };
  },
  props: {
    userPageTitle: String,
    userId: Number,
  },
  created() {
    this.loadUserProfile();
    eventBus.$on("loadUserProfile", () => {
      this.loadUserProfile();
    });
  },
  methods: {
    loadUserProfile() {
      apiFetch
        .get(`/auth/user-profile/${this.userId}`)
        .then((data) => {
          this.user = data.user;
          this.$emit("userInfos", this.user);
          console.log(this.user);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
img {
  height: 200px;
}
</style>
