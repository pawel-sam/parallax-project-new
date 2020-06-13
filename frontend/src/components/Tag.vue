<template>
  <!-- <div v-on:click="openCard()" class="container"> -->
  <div class="container">
    <div class="tag-flag" @click="callModal('modal_tag')">
      <h1 class="annotation">{{annotation}}</h1>
      <div class="photo"></div>
    </div>
    <!-- <div v-if="isOpened" class="tag-card">
      <h1 class="annotation">{{annotation}}</h1>
      <div class="photo"></div>
      <div class="fullText">{{fullText}}</div>
    </div>-->
    <!-- всплывашка -->
    <div class="editor__ui-modal">
      <ui-modal
        ref="modal_tag"
        size="large"
        :title="annotation"
        remove-header
        transition="scale-up"
      >
        <div slot="header">{{annotation}}</div>
        <h1 class="annotation">{{annotation}}</h1>
        <div class="photo">
          <img :src="imageId" />
        </div>
        <div class="fullText">{{fullText}}</div>
      </ui-modal>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tag",
  props: {
    version: Number
  },
  data() {
    return {
      annotation: "Первое погружение",
      fullText:
        "Это было незабываемо. Для того, чтобы нырять правильно, я специально учился." +
        " Для рекреационного дайвинга, самого простого, есть 2 уровня - OWD (Open Water Diver)" +
        " и AOWD (Advanced Open Water Diver). В принципе, и тот, и другой имеет право прийти и присоединиться к группе, " +
        "но есть ограничения - OWD может погружаться до 18 метров, AOWD - до 30 метров. Ну и у AOWD подготовка пошире -" +
        " при обучении проходится и ориентирование," +
        " и ночные погружения, и еще всякие дополнительные штуки.",
      isOpened: false,
      position: Number,
      type: String,
      imageId: "../img/daiving.e0cbcf5f.jpg"
      /* imageId: Number */
    };
  },
  methods: {
    calculatePosition() {
      this.position;
    },
    pickType() {
      if (this.imageId === null) {
        this.type = "text";
      } else {
        this.type = "image";
      }
    },
    uploadFile() {
      const template =
        "ABCDEFGHIJKLMNOPQRSTUYQVWZXYZabcdefghijklmnopqrstuvwxyz1234567890";
      this.imageId = "";
      for (let i = 0; i < 6; i++) {
        this.imageId += template[Math.floor(Math.random() * template.length)];
      }
    } /* 
    openCard() {
      this.isOpened = !this.isOpened;
    }, */,
    callModal(ref) {
      // открываем закрываем модалку
      let modal = this.$refs[ref];
      if (modal.isOpen) {
        modal.close();
      } else {
        modal.open();
      }
    }
  }
};
</script>
<style scoped>
.container {
  margin-left: -15px;
  z-index: 6;
  height: 50%;
  position: absolute;
  left: 996px;
}
.tag-flag {
  width: 120px;
  height: 120px;
  background-image: url("../images/tag.svg");
  margin-top: calc(-25% - 80px);
  transform: scale(0.8, 0.8);
}

.tag-flag > h1 {
  font-size: 13px;
  font-family: "Helvetica", sans-serif;
  font-weight: normal;
  margin-left: 10px;
  color: #edf9f9;
}

.tag-flag > .photo {
  background-image: url("../images/daivingmini.jpg");
  background-size: cover;
  margin-left: 17px;
  border-radius: 5px;
  margin-top: -5px;
  width: 96px;
  height: 55px;
}

.tag-card {
  width: 80vw;
  height: 80vh;
  background: #7b7c7c;
  position: fixed;
  padding-bottom: 20px;
  top: 10vh;
  left: 10vw;
}

.tag-card > h1 {
  font-size: 30px;
  font-family: "Poiret One", cursive;
  color: white;
}

.tag-card > .photo {
  background-image: url("../images/daiving.jpg");
  background-size: cover;
  width: 95%;
  height: 70%;
  margin: 10px auto;
}

.fullText {
  padding: 15px;
  margin-top: 10px;
  text-align: center;
  font-size: 18px;
  font-family: "Helvetica", sans-serif;
  color: #dfe5e5;
}
</style>

