<template>
  <div class="center bg-image header-bg">
    <b-img :src="require('../assets/images/icon-left-font-monochrome-red.png')" alt="groupomania logo" fluid
      class="logo"></b-img>
  </div>
</template>

<script>
export default {
  name: "headerAccueil",
};
</script>

<style lang="scss" scoped>
.logo {
  max-height: 100px;
  margin-top: 10px;
}

.header-bg {
  background-color: white !important;
}

.bg-image {
  background-image: url('../assets/images/immeublegroupo.png');
  background-size: cover;
}
</style>
