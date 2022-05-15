<!-- gestion image utilisateur -->

<template>
  <b-img :height="imageHeight" :width="imageHeight" :src="imageUrl || require('../assets/images/noProfileImage.png')"
    :alt="alt" rounded="circle" class="image-cover border border-danger">
  </b-img>
</template>

<script>
export default {
  name: "ProfileImage",
  components: {},
  props: {
    imageHeight: String,
    imageUrl: String,
    alt: String,
  },
};
</script>

<style>
.image-cover {
  object-fit: cover;
  flex-shrink: 0;
}
</style>
