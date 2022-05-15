<!-- details de la disposition des images -->

<template>
  <div>
    <!-- si une image -->
    <b-row align-h="center" class="mb-3" v-if="imageUrl.length == 1">
      <b-col class="p-1 d-flex justify-content-center">
        <b-img
          :src="imageUrl[0]"
          alt=""
          class="post-image"
          fluid
          rounded
          v-b-modal="'modal-' + imageUrl[0]"
        ></b-img>

        <b-modal :id="'modal-' + imageUrl[0]" hide-footer size="lg">
          <div class="d-flex justify-content-center">
            <b-img :src="imageUrl[0]" alt="" class="modal-img"></b-img>
          </div>
        </b-modal>
      </b-col>
    </b-row>

    <!-- si plusieurs images -->
    <b-row align-h="center" class="mb-3" v-else>
      <b-col
        cols="6"
        class="p-1 d-flex justify-content-center image-col img-div"
        v-for="value in imageUrl"
        :key="value"
      >
        <b-img
          :src="value"
          alt=""
          class="post-image"
          fluid
          rounded
          v-b-modal="'modal-' + value"
        ></b-img>

        <b-modal :id="'modal-' + value" hide-footer size="lg">
          <div class="d-flex justify-content-center">
            <b-img :src="value" alt="" class="modal-img"></b-img>
          </div>
        </b-modal>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "PostImages",
  data() {
    return {
      imageUrl: JSON.parse(this.post.imageUrl),
    };
  },
  props: {
    post: Object,
  },
};
</script>

<style scoped>
.img-div {
  height: 250px;
}

.post-image {
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: cover;
  max-height: 20rem;
}

.modal-img {
  object-fit: contain;
  width: 100%;
  max-height: 30rem;
}

@media (max-width: 576px) {
  .img-div {
    height: 150px;
  }
  .post-image {
    max-height: 15rem;
  }
}
</style>
