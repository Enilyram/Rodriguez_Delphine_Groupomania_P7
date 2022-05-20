<!-- header de la publication / details user et depuis quand -->

<template>
  <b-row align-v="center" class="bg-header">
    <b-col cols="11" class="d-flex align-items-center ">
      <ProfileImage imageHeight="50" :imageUrl="post.User.profilePhoto"
        :alt="`image de profil de ${post.User.firstName}`" />

      <div class="px-1 d-flex">
        <div class="d-flex align-items-center header-font-name">
          {{ post.User.firstName }} {{ post.User.lastName }}
        </div>
        <div class="d-flex align-items-center px-1 header-date">
          il y a {{ dayjs(post.createdAt).locale("fr").fromNow(true) }}
        </div>
      </div>
    </b-col>
    <b-col cols="1" class="px-0 d-flex justify-content-end">
      <!-- ------------------------modification du post ------------------------------------- -->
      <b-dropdown text="Modifier" size="sm" id="dropdown-right" right class="m-2 border-radius"
        v-if="post.userId == this.userData.id || this.userData.admin == '1'" toggle-text="Options"
        aria-label="Options de la publication">
        <b-dropdown-item v-b-modal="'modal-modify' + post.id" v-if="post.userId == this.userData.id">Modifier
        </b-dropdown-item>
        <b-modal :id="'modal-modify' + post.id" title="Modifier la publication" ok-title="modifier"
          cancel-title="annuler" @ok="modifyPost(`${post.id}`, $event)" centered>
          <b-form class="col p-2 overflow-hidden">
            <!-- modification contenu -->
            <b-form-textarea rows="2" max-rows="10" v-model="description" class="modify-description"></b-form-textarea>

            <!-- ajout de médias -->
            <PostInputMedia labelTitle="Modifier les images" inputImageId="input-image-modify"
              inputImageClass="input-file-modify" previewMedia=".preview-media-modify" inputFile=".input-file-modify" />

            <!-- preview des images -->
            <div class="preview-media-modify text-secondary font-italic">
              <div v-for="value in imageUrl" :key="value">
                <b-img :src="value" alt="" class="post-images"></b-img>
              </div>
            </div>
            <p class="text-danger small" v-if="errorMessage">
              {{ errorMessage }}
            </p>
          </b-form>
          <!--  -->
          <template #modal-footer="{ ok, cancel }">
            <b-button pill active variant="secondary" @click="cancel()">Retour</b-button>
            <b-button pill active variant="secondary" @click="ok()"> Modifier </b-button>
          </template>
          <!--  -->
        </b-modal>

        <!-- -suppresion post- -->
        <b-dropdown-item v-b-modal="'modal-' + post.id">Supprimer</b-dropdown-item>
        <b-modal :id="'modal-' + post.id" title="Voulez-vous vraiment supprimer cette publication ?"
          ok-title="supprimer" cancel-title="annuler" @ok="deletePost(`${post.id}`)">
          <p>La publication sera supprimée définitivement.</p>
          <template #modal-footer="{ ok, cancel }">
            <b-button pill active variant="secondary" @click="cancel()">Retour</b-button>
            <b-button pill active variant="secondary" @click="ok()"> Supprimer</b-button>
          </template>
        </b-modal>
      </b-dropdown>
    </b-col>
  </b-row>
</template>

<script>
import ProfileImage from "./ProfileImage.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
require("dayjs/locale/fr");

// -------------------------------------
import PostInputMedia from "../components/PostInputMedia.vue";
import { apiFetch } from "../utils/ApiFetch";
// -------------------------------------

export default {
  name: "PostHeader",
  components: {
    ProfileImage,
    PostInputMedia,
  },
  props: {
    post: { type: Object },
    loadPosts: { type: Function },
  },
  data() {
    return {
      dayjs: dayjs,
      imageUrl: JSON.parse(this.post.imageUrl),
      userData: JSON.parse(localStorage.getItem("userData")),
      errorMessage: "",
      description: this.post.description,
    };
  },

  methods: {
    deletePost(id) {
      apiFetch
        .delete("/posts/" + id)
        .then(() => {
          this.$emit(this.loadPosts());
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modifyPost(id, event) {
      const description = document.querySelector(".modify-description").value;
      const userId = this.userData.id;
      const previewMedia = document.querySelector(".preview-media-modify");

      const selectedFile = document.querySelector(".input-file-modify");
      let images = selectedFile.files;

      if (description === "" && !previewMedia.firstChild) {
        event.preventDefault();
        this.errorMessage = "vous ne pouvez pas envoyer un post vide";
      } else {
        this.errorMessage = "";
        const isFormData = images.length > 0;
        let body = {
          userId: Number(userId),
          description: description,
        };

        if (isFormData) {
          const formData = new FormData();
          for (let i = 0; i < images.length; i++) {
            formData.append("image", images[i]);
          }
          formData.append("post", JSON.stringify(body));
          body = formData;
        }

        apiFetch
          .put("/posts/" + id, body, { isFormData })
          .then(() => {
            this.$emit(this.loadPosts());
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post-content {
  white-space: pre-wrap;
}

.preview-media-modify {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
}

.post-images {
  width: 100px;
  margin: 0.3rem;
}

.header-font-name {
  font-size: 1.2rem;
}

.header-date {
  font-size: 0.9rem;
}

.bg-header {
  color: #D1515A;
}
</style>
