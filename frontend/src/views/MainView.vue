<!-- vue principale du site -->

<template>
  <div>
    <header class="header">
      <HeaderGeneral />
    </header>
    <b-container>
      <main class="mb-5">
        <h1 class="center my-4">Fil d'actualités</h1>
        <div class="center">
          <PostCreation />
        </div>

        <div>
          <PostList />
        </div>
      </main>
    </b-container>
  </div>
</template>

<script>
import HeaderGeneral from "../components/HeaderGeneral.vue";
import PostCreation from "../components/PostCreation.vue";
import PostList from "../components/PostList.vue";

export default {
  name: "MainView",

  components: {
    HeaderGeneral,
    PostCreation,
    PostList,
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0px;
  z-index: 4;
}
</style>
