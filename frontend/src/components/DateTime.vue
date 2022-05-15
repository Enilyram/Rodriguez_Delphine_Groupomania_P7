<!-- outil permetant d'avoir la date et l'heure en temps reel -->

<template>
  <div>
    {{ timestamp }}
  </div>
</template>

<script>
// import dayjs from "dayjs";

export default {
  name: "DateTime",
  data() {
    return {
      timestamp: "",
    };
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    getNow: function () {
      const today = new Date();

      const date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

      let minutes = today.getMinutes();
      // pour mettre le 0 devant les chiffres de 1 à 9
      if (minutes.toString().length === 1) {
        minutes = "0" + minutes;
      }
      let seconds = today.getSeconds();
      // pour mettre le 0 devant les chiffres de 1 à 9
      if (seconds.toString().length === 1) {
        seconds = "0" + seconds;
      }
      const time = today.getHours() + ":" + minutes + ":" + seconds;

      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    },
  },
};
</script>
