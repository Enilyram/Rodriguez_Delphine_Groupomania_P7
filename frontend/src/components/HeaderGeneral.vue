<!-- Header -->

<template>
  <div class="center bg-image text-white mb-3 header-bg header-fixed">
    <!-- menu mobile -->
    <div class="d-flex justify-content-between menu-mobile d-sm-none pb-1">
      <b-img :src="require('../assets/images/logo_court.png')" alt="groupomania logo" fluid></b-img>
      <b-nav>
        <b-nav-item to="/groupomania" exact>
          <b-icon icon="chat-square-text" aria-label="accueil" class="menu-icon"></b-icon>
        </b-nav-item>
        <b-nav-item to="/myprofile" exact>
          <b-icon class="menu-icon" icon="person-square" aria-label="mon profil"></b-icon>
        </b-nav-item>
        <b-nav-item>
          <b-icon class="menu-icon" @click="logout" icon="box-arrow-right" aria-label="déconnexion"></b-icon>
        </b-nav-item>
      </b-nav>
    </div>

    <!-- menu classique -->
    <div class="d-none d-sm-block">
      <b-img :src="require('../assets/images/icon-left-font-monochrome-red.png')" alt="groupomania logo" fluid
        class="logo"></b-img>
      <b-nav class="d-flex justify-content-center">
        <b-nav-item @click="mainView">
          <b-icon icon="chat-square-text" aria-label="accueil" class="menu-icon"></b-icon><br />
          <p class="menu-text">Accueil</p>
        </b-nav-item>
        <b-nav-item to="/myprofile" exact>
            <b-icon class="menu-icon" icon="person-square" aria-label="mon profil"></b-icon><br />
            <p class="menu-text">Mon profil</p>
        </b-nav-item>
        <b-nav-item @click="logout">
          <b-icon class="menu-icon" icon="box-arrow-right" aria-label="déconnexion"></b-icon>
          <p class="menu-text">Déconnexion</p>
        </b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>

import router from "../router/index";

export default {
  name: "HeaderGeneral",

  data() {
    return {
      user: JSON.parse(localStorage.getItem("userData")),
    };
  },

  methods: {
    mainView() {
      router.push({ name: "groupomania" });
    },

    logout() {
      localStorage.clear();
      router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}

.logo {
  max-height: 100px;
  margin-top: 10px;
}

.menu-icon {
  color: #D1515A;
  height: 40px;
  width: 40px;
}

.menu-mobile {
  height: 50px;
}

.menu-text {
  text-decoration: none;
  color: #091F43;
  margin-bottom: 0;
  font-weight: bold;
}

@media (min-width: 576px) {
  .menu-icon {
    height: 30px;
    width: 30px;
  }
}

.header-fixed {
  position: sticky;
  top: 0px;
  width: 100%;
}

.header-bg {
  background-color: white !important;
}

.bg-image {
  background-image: url('../assets/images/immeublegroupo.png');
  background-size: cover;
}
</style>
