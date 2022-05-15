// detail des routes utilisées //

import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/UserLogin.vue";
import Signup from "../views/UserSignup.vue";
import MainView from "../views/MainView.vue";
import MyProfile from "../views/MyProfile.vue";
//import AdminView from "../views/AdminView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "enregistrement",
    component: Signup,
  },
  {
    path: "/groupomania",
    name: "groupomania",
    component: MainView,
  },
  {
    path: "/myprofile",
    name: "monprofil",
    component: MyProfile,
  },
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
