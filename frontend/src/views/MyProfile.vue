<!-- page mon profil -->

<template>
  <div>
    <div>
      <HeaderGeneral />
    </div>
    <b-container class="center mb-5">
      <div v-if="mode == 'show'">
        <b-card class="shadow">
          <InfosProfil userPageTitle="Mon Profil :" :userId="this.userData.id" />
          <b-button pill @click="changeMode" class="m-1" type="submit">Editer le profil</b-button>
        </b-card>
      </div>
      <div v-if="mode == 'edit'">
        <EditionProfil @returnShow="returnShow" />
      </div>
    </b-container>
    <div class="mt-3">
    </div>
  </div>
</template>

<script>
import HeaderGeneral from "../components/HeaderGeneral.vue";
import InfosProfil from "../components/InfosProfil.vue";
import EditionProfil from "../components/EditionProfil.vue";
import { eventBus } from "../main.js";

export default {
  name: "MyProfil",
  components: {
    HeaderGeneral,
    InfosProfil,
    EditionProfil,
  },
  data() {
    return {
      mode: "show",
      user: null,
      userData: JSON.parse(localStorage.getItem("userData")),
    };
  },
  mounted() {
    eventBus.$emit("loadUserProfile");
  },
  methods: {
    changeMode() {
      this.mode = "edit";
    },
    returnShow(payload) {
      this.mode = payload.mode;
      eventBus.$emit("loadUserProfile");
    },
  },
};
</script>

<style>
.center {
  text-align: center;
}
</style>
