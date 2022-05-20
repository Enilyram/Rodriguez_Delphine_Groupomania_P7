<!-- page mon profil -->

<template>
  <div>
    <div>
      <HeaderMainView />
    </div>
    <b-container class="center mb-5">
      <div v-if="mode == 'show'">
        <b-card class="shadow">
          <UserProfileInfos userPageTitle="Mon Profil :" :userId="this.userData.id" />
          <b-button pill @click="changeMode" class="m-1" type="submit">Editer le profil</b-button>
        </b-card>
      </div>
      <div v-if="mode == 'edit'">
        <MyProfileEdit @returnShow="returnShow" />
      </div>
    </b-container>
    <div class="mt-3">
    </div>
  </div>
</template>

<script>
import HeaderMainView from "../components/HeaderMainView.vue";
import UserProfileInfos from "../components/UserProfileInfos.vue";
import MyProfileEdit from "../components/MyProfileEdit.vue";
import { eventBus } from "../main.js";

export default {
  name: "MyProfil",
  components: {
    HeaderMainView,
    UserProfileInfos,
    MyProfileEdit,
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
