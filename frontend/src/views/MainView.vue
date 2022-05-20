<!-- vue principale du site -->

<template>
  <div>
    <header class="header">
      <HeaderMainView />
    </header>
    <b-container class="col-sm-6" >
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
import HeaderMainView from "../components/HeaderMainView.vue";
import PostCreation from "../components/PostCreation.vue";
import PostList from "../components/PostList.vue";

export default {
  name: "MainView",

  components: {
    HeaderMainView,
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
