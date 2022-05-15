<!-- outil pour l'ajout des images -->

<template>
  <div>
    <label :for="inputImageId" role="button">{{ labelTitle }}</label>
    <input type="file" :id="inputImageId" name="image" accept=".jpg, .jpeg, .png, .gif" :class="inputImageClass"
      @change="
        updateMediaDisplay({
          preview: previewMedia,
          inputFile: inputFile,
        })
      " multiple hidden />
  </div>
</template>

<script>
export default {
  name: "PostInputMedia",
  props: {
    inputImageId: String,
    inputImageClass: String,
    labelTitle: String,
    previewMedia: String,
    inputFile: String,
  },
  methods: {
    updateMediaDisplay({ preview, inputFile }) {
      const previewMedia = document.querySelector(preview);
      const input = document.querySelector(inputFile);

      while (previewMedia.firstChild) {
        previewMedia.removeChild(previewMedia.firstChild);
      }

      let currentFiles = input.files;
      let filesStatus = document.createElement("p");
      if (currentFiles.length === 0) {
        filesStatus.textContent = "Aucun fichier sélectionné";
        previewMedia.appendChild(filesStatus);
      } else if (currentFiles.length > 4) {
        filesStatus.textContent = "Vous ne pouvez selectionner que 4 images";
        previewMedia.appendChild(filesStatus);
      } else {
        let list = document.createElement("ul");
        list.style.cssText =
          "display:flex; flex-wrap:wrap; list-style:none; margin:0; padding:0;";
        previewMedia.appendChild(list);
        for (let i = 0; i < currentFiles.length; i++) {
          let listItem = document.createElement("li");
          listItem.style.cssText = "width:100px; margin:0.3rem";
          let fileName = document.createElement("p");
          fileName.style.cssText =
            "font-size:0.9rem; white-space: nowrap; overflow:hidden; text-overflow:ellipsis";

          if (this.validFileType(currentFiles[i])) {
            fileName.textContent = currentFiles[i].name;
            let image = document.createElement("img");
            image.style.width = "inherit";
            image.src = window.URL.createObjectURL(currentFiles[i]);
            listItem.appendChild(image);
            listItem.appendChild(fileName);
          } else {
            fileName.textContent =
              currentFiles[i].name +
              ": Format de fichier incorrect. Merci de choisir un format png, jpg, jpeg ou gif.";
            listItem.appendChild(fileName);
          }

          list.appendChild(listItem);
        }
      }
    },
    validFileType(file) {
      const fileTypes = ["image/jpeg", "image/jpeg", "image/png", "image/gif"];

      for (let i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style scoped>
div {
  text-align: left;
}
</style>
