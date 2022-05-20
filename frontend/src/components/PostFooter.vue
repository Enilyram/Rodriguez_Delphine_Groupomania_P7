<!-- bas de la publi, afficher, commenter -->

<template>
  <b-container class="test">
    <b-row>
      <div class="d-flex align-items-center justify-content-center">
        <div class="margin-r">
          <!-- nombre de com -->
           <div v-if="postcommentsCount == 0">
           Soyez le premier à
          </div> 
          <div v-if="postcommentsCount ">
            {{ postcommentsCount }}
            <b-icon icon="chat-dots" aria-label="accueil"></b-icon>
          </div>
        </div>

        <div @click="showComments" v-if="modeShowComments == 'default' && postcommentsCount > 0" class="margin-r cursor-pointer">
          Afficher
        </div>
        <div @click="hideComments" v-if="modeShowComments == 'showComments'" class="margin-r cursor-pointer">
          Masquer
        </div>
        <div class="margin-r cursor-pointer" @click="showCreateComment">Commenter</div>
      </div>
    </b-row>

    <b-row align-v="center">
      <b-col>
        <!-- Affichage commentaires -->
        <div v-if="modeShowComments == 'showComments'">
          <b-card v-for="comments in commentsList" :key="comments.id" header-tag="header">
            <!-- entete du commentaire -->
            <template #header>
              <b-container class="header-com">
                <b-row align-v="center">
                  <b-col cols="11" class="d-flex">
                    <div class="d-flex">
                      <ProfileImage imageHeight="40" :imageUrl="comments.User.profilePhoto"
                        :alt="`image de profil de ${comments.User.firstName}`" />
                      <div class="px-1 d-flex">
                        <div class="d-flex align-items-center">
                          {{ comments.User.firstName }}
                          {{ comments.User.lastName }}
                        </div>

                        <div class="d-flex align-items-center px-1 header-date">
                          il y a
                          {{
                              dayjs(comments.createdAt).locale("fr").fromNow(true)
                          }}
                        </div>
                      </div>
                    </div>
                  </b-col>

                  <!-- menu de droite -->
                  <b-col cols="1" class="px-0 d-flex justify-content-end">
                    <b-dropdown size="sm"  right class="m-2" v-if="
                    comments.User.id == userData.id || userData.admin == '1'" text="Modifier">
                      <!-- modifier commentaire -->
                      <b-dropdown-item v-b-modal="'modal-comment-modify-' + comments.id"
                        v-if="comments.User.id == userData.id">Modifier</b-dropdown-item>
                      <b-modal :id="'modal-comment-modify-' + comments.id" title="Modifier le commentaire"
                        ok-title="modifier" cancel-title="annuler" @ok="modifyComment(`${comments.id}`, $event)"
                        centered>
                        <b-form class="col p-2 overflow-hidden">
                          <b-form-textarea rows="2" max-rows="10" v-model="comments.description"
                            class="modify-description" title="modifier le commentaire"></b-form-textarea>

                          <p v-if="errorMessage">
                            {{ errorMessage }}
                          </p>
                        </b-form>
                        <template #modal-footer="{ ok, cancel }">
                          <b-button pill variant="secondary" @click="cancel()">Retour</b-button>
                          <b-button pill variant="secondary" @click="ok()">
                            Envoyer</b-button>
                        </template>
                      </b-modal>

                      <!-- supprimer commentaire -->
                      <b-dropdown-item v-b-modal="'modal-comment-delete' + comments.id">
                        Supprimer
                      </b-dropdown-item>
                      <b-modal :id="'modal-comment-delete' + comments.id"
                        title="Voulez-vous vraiment supprimer ce commentaire ?" ok-title="supprimer"
                        cancel-title="annuler" @ok="deleteComment(`${comments.id}`)" centered>
                        <p>Le commentaire sera supprimé définitivement.</p>
                        <template #modal-footer="{ ok, cancel }">
                          <b-button pill variant="secondary" @click="cancel()">Retour</b-button>
                          <b-button pill variant="secondary" @click="ok()">
                            Supprimer</b-button>
                        </template>
                      </b-modal>
                    </b-dropdown>
                  </b-col>
                </b-row>
              </b-container>
            </template>
            <p>{{ comments.description }}</p>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <!-- Creation commentaire -->
      <div v-if="modeCreationComment == 'createComment'" class="center">
        <b-card>
          <b-form @submit.prevent="createComment">
            <b-form-textarea placeholder="Ecrivez une réponse..." rows="1" v-model="commentDescription"
              title="Créer un commentaire">
            </b-form-textarea>
            <p class="text-danger small">{{ errorMessage }}</p>
            <b-button pill class="m-1" @click="cancel" type="reset">Annuler</b-button>
            <b-button pill class="m-1" type="submit">Commenter</b-button>
          </b-form>
        </b-card>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import { apiFetch } from "../utils/ApiFetch";
import ProfileImage from "../components/ProfileImage.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
require("dayjs/locale/fr");
import { eventBus } from "../main.js";

export default {
  name: "PostFooter",

  components: {
    ProfileImage,
  },

  props: {
    post: { type: Object },
  },

  data() {
    return {
      modeShowComments: "default",
      modeCreationComment: "default",
      commentDescription: "",
      errorMessage: "",
      userData: JSON.parse(localStorage.getItem("userData")),
      dayjs: dayjs,
      postcommentsCount: "",
    };
  },

  created() {
    console.log("----------------------------");
    console.log(this.userData.id);

    console.log("----------------------------");
    apiFetch
      .get(`/posts/${this.post.id}/comments/`)
      .then((data) => {
        this.commentsList = data.comments.rows;
        //this.postcommentsCount = this.post.commentsCount;
        this.postcommentsCount = data.comments.count;
      })
      .catch((error) => {
        console.log(error);
      });
    eventBus.$on("loadPostComments", () => {
      this.loadPostComments();
    });
  },

  methods: {
    showCreateComment() {
      this.modeCreationComment = "createComment";
    },
    cancel() {
      this.modeCreationComment = "default";
    },

    loadPostComments() {
      apiFetch
        .get(`/posts/${this.post.id}/comments/`)
        .then((data) => {
          this.commentsList = data.comments.rows;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createComment() {
      const commentDescription = this.commentDescription;
      const userId = this.userData.id;

      if (commentDescription !== "") {
        this.errorMessage = "";
        let body = {
          userId: Number(userId),
          description: commentDescription,
        };
        apiFetch
          .post(`/posts/${this.post.id}/comment`, body)
          .then(() => {
            this.commentDescription = "";
            this.modeCreationComment = "default";
            this.loadPostComments();
            this.modeShowComments = "default";
            this.postcommentsCount += 1;
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage = "Une erreur est survenue.";
          });
      } else {
        this.errorMessage = "Vous ne pouvez pas ajouter un commentaire vide.";
      }
    },

    showComments() {
      this.modeShowComments = "showComments";
    },

    hideComments() {
      this.modeShowComments = "default";
    },

    modifyComment(id, event) {
      const description = document.querySelector(".modify-description").value;
      if (description === "") {
        this.loadPostComments();
        event.preventDefault();
        this.errorMessage = "Vous ne pouvez pas envoyer un commentaire vide.";
      } else {
        this.errorMessage = "";
        let body = {
          description: description,
        };
        apiFetch
          .put(`/posts/${this.post.id}/comment/` + id, body)
          .then(() => {
            this.loadPostComments();
            this.modeShowComments = "default";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    deleteComment(id) {
      apiFetch
        .delete(`/posts/${this.post.id}/comment/` + id)
        .then(() => {
          this.loadPostComments();
          this.modeShowComments = "default";
          this.postcommentsCount -= 1;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.margin-r {
  margin-right: 10px;
}

.header-date {
  font-size: 0.8rem;
}

.test {
  padding: 0px;
}

.cursor-pointer { 
  cursor: pointer; 
  }

</style>
