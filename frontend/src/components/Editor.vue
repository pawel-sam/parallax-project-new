<template>
  <div class="editor">
    <div class="editor__ui-add">
      <ui-fab
        class="ui-add__button"
        @click="openModal('modal_add')"
        color="primary"
        icon="add"
        tooltip-position="left"
        tooltip="Добавить"
        :disabled="disabled_add"
        size="normal"
      ></ui-fab>
    </div>
    <div class="editor__ui-set">
      <ui-fab
        class="ui-set__button"
        @click="openModal('modal_set')"
        color="primary"
        icon="straighten"
        tooltip-position="left"
        tooltip="Настройки"
        size="normal"
      ></ui-fab>
    </div>
    <div class="editor__ui-share">
      <ui-fab
        class="ui-share__button"
        @click="openModal('modal_share')"
        color="primary"
        icon="share"
        tooltip-position="left"
        tooltip="Поделиться"
        :disabled="disabled_share"
        size="normal"
      ></ui-fab>
    </div>
    <div class="editor__ui-modal">
      <ui-modal ref="modal_set" size="normal" title="Настройки" transition="scale-up">
        <form v-on:submit.prevent="submitSet">
          <p>Привет! Для того, чтобы прикрепить событие в мире или из вашей жизни, настройте шкалу</p>
          <div class="editor__ui-textbox">
            <ui-textbox
              floating-label
              label="Начало шкалы"
              placeholder="Введите число"
              help="Укажите год начала шкалы"
              type="number"
              :min="0"
              :max="9999"
              v-model.number="startScale"
            ></ui-textbox>
          </div>
          <div class="editor__ui-textbox">
            <ui-textbox
              floating-label
              label="Конец шкалы"
              placeholder="Введите число"
              help="Укажите год конца шкалы"
              type="number"
              :min="0"
              :max="9999"
              v-model.number="endScale"
            ></ui-textbox>
          </div>
          <div class="editor__ui-select">
            <ui-select
              floating-label
              label="Где?"
              placeholder="Выберете шкалу"
              help="Шкала, куда вы хотите прикрутить событие"
              :options="scaleChoise"
              v-model="selectScale"
            ></ui-select>
          </div>
          <ui-button
            class="ui-tab__next"
            buttonType="submit"
            color="primary"
            @click="closeModal('modal_set')"
          >Создать</ui-button>
        </form>
      </ui-modal>
    </div>
    <div class="editor__ui-modal">
      <ui-modal ref="modal_add" size="normal" title="Новое событие" transition="scale-up">
        <form v-on:submit.prevent="submitAdd">
          <div class="ui-modal__ui-tabs">
            <ui-tabs raised ref="controlTabs">
              <ui-tab title="Название" id="tab1">
                <div class="ui-tab__content">
                  <p>Привет! Для того, чтобы прикрепить событие в мире или из вашей жизни, укажите его название...</p>
                  <div class="editor__ui-textbox">
                    <ui-textbox
                      floating-label
                      label="Что произошло?"
                      placeholder="Укажите имя"
                      help="Укажите название вашего события"
                      :minlength="4"
                      :maxlength="144"
                      :enforceMaxlength="true"
                      v-model="annotation"
                      name="annotation"
                    ></ui-textbox>
                  </div>
                </div>
                <div class="ui-tab__footer">
                  <ui-button
                    class="ui-tab__next"
                    buttonType="button"
                    @click="selectNextTab('tab2')"
                    color="primary"
                  >Далее</ui-button>
                </div>
              </ui-tab>
              <ui-tab title="Описание" id="tab2">
                <div class="ui-tab__content">
                  <p>Привет! Для того, чтобы прикрепить событие в мире или из вашей жизни, опишите его...</p>
                  <div class="editor__ui-textbox">
                    <ui-textbox
                      floating-label
                      label="Краткая история"
                      help="Добавьте описание вашего события. Максимум 1000 символов"
                      :multiLine="true"
                      :rows="8"
                      :autosize="false"
                      :minlength="145"
                      :maxlength="1000"
                      :enforceMaxlength="true"
                      v-model="fullText"
                      name="fullText"
                    ></ui-textbox>
                  </div>
                </div>
                <div class="ui-tab__footer">
                  <ui-button
                    class="ui-tab__previous"
                    buttonType="button"
                    @click="selectPrevTab('tab1')"
                    color="primary"
                  >Назад</ui-button>
                  <ui-button
                    class="ui-tab__next"
                    buttonType="button"
                    @click="selectNextTab('tab3')"
                    color="primary"
                  >Далее</ui-button>
                </div>
              </ui-tab>
              <ui-tab title="Иллюстрация" id="tab3">
                <div class="ui-tab__content">
                  <p>Загрузите фотографию или добавьте ссылку</p>
                  <div class="editor__ui-textbox">
                    <ui-textbox
                      floating-label
                      iicon="link"
                      label="Url"
                      placeholder="Ссылка на картинку"
                      help="Добавьте ссылку на картинку вашего события"
                      v-model="imageUrl"
                    ></ui-textbox>
                  </div>
                  <p>или загрузите вашу фотографию</p>
                  <div class="editor__ui-fileupload">
                    <ui-fileupload
                      accept="image/*"
                      color="primary"
                      :raised="true"
                      name="file"
                      @change="onFileChange"
                    >Выберете картинку</ui-fileupload>
                    <div class="ui-fileupload__preview" v-if="filePreviewImage.length > 0">
                      <img
                        alt="filePreviewName"
                        class="ui-fileupload__preview-image"
                        :src="filePreviewImage"
                      />
                    </div>
                  </div>
                </div>
                <div class="ui-tab__footer">
                  <ui-button
                    class="ui-tab__previous"
                    buttonType="button"
                    @click="selectPrevTab('tab2')"
                    color="primary"
                  >Назад</ui-button>
                  <ui-button
                    class="ui-tab__next"
                    buttonType="button"
                    @click="selectNextTab('tab4')"
                    color="primary"
                  >Далее</ui-button>
                </div>
              </ui-tab>
              <ui-tab title="Итог" id="tab4">
                <div class="ui-tab__content">
                  <div class="editor__tag-preview">
                    <figure class="left">
                      <img :src="filePreviewImage" alt="annotation" />
                      <figcaption>{{ annotation }}</figcaption>
                    </figure>
                    <p>{{ fullText }}</p>
                  </div>
                </div>
                <div class="ui-tab__footer">
                  <ui-button
                    class="ui-tab__previous"
                    buttonType="button"
                    @click="selectPrevTab('tab3')"
                    color="primary"
                  >Назад</ui-button>
                  <ui-button
                    class="ui-tab__next"
                    buttonType="submit"
                    color="primary"
                    @click="closeModal('modal_add')"
                  >Создать</ui-button>
                </div>
              </ui-tab>
            </ui-tabs>
          </div>
        </form>
      </ui-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "Editor",

  components: {},

  data() {
    return {
      disabled_add: true,
      disabled_share: true,
      startScale: "",
      endScale: "",
      annotation: "",
      fullText: "",
      imageUrl: "",
      filePreviewImage: "",
      submitted: false,
      selectScale: "",
      scaleChoise: [
        {
          label: "В мире",
          value: "world"
        },
        {
          label: "В жизни",
          value: "life"
        }
      ]
    };
  },

  methods: {
    openModal(ref) {
      this.$refs[ref].open();
    },

    closeModal(ref) {
      this.$refs[ref].close();
    },

    selectPrevTab(tab_id) {
      this.$refs.controlTabs.setActiveTab(tab_id);
    },

    selectNextTab(tab_id) {
      this.$refs.controlTabs.setActiveTab(tab_id);
    },

    onFileChange(files) {
      this.filePreviewImage = URL.createObjectURL(files[0]);
    },

    submitSet() {
      this.disabled_add = false;
      console.log(this.$data);
    },

    submitAdd() {
      this.submitted = true;
      console.log(this.$data);
    },

    onQueryChange(query) {
      if (query.length === 0) {
        return;
      }
      this.fetchRemoteResults(query);
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.editor__ui-add {
  .ui-add__button {
    display: block;
    position: fixed;
    right: 55px;
    bottom: 55px;
    cursor: pointer;
    outline: none;
  }
}

.editor__ui-set {
  .ui-set__button {
    display: block;
    position: fixed;
    right: 55px;
    bottom: 130px;
    cursor: pointer;
    outline: none;
  }
}

.editor__ui-share {
  .ui-share__button {
    display: block;
    position: fixed;
    right: 55px;
    bottom: 205px;
    cursor: pointer;
    outline: none;
  }
}

.editor__ui-modal {
  .ui-modal__ui-tabs {
    .ui-tabs__body {
      min-height: 60vh;
    }
    .ui-tab {
      display: flex;
      min-height: 60vh;
      flex-direction: column;
      .ui-tab p {
        &:first-child {
          margin-top: 0;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
      .ui-tab__content {
        flex: 1;
      }
      .ui-tab__footer {
        align-items: center;
        display: flex;
        padding: 1rem 0 0;
        .ui-button {
          cursor: pointer;
        }
        .ui-tab__previous {
          justify-content: flex-start;
        }
        .ui-tab__next {
          margin-left: auto;
        }
      }
    }
  }
}

.editor__ui-select {
  .ui-select {
    margin-bottom: rem(32px);
    max-width: rem(400px);
  }
}

.editor__ui-textbox {
  .ui-textbox {
    max-width: rem(600px);
  }
}

.editor__ui-fileupload {
  .ui-fileupload__preview {
    display: table;
    border: 1px solid #ddd;
    margin-top: 8px;
    padding: 4px;
    line-height: 1;
  }
  .ui-fileupload__preview-image {
    min-width: 24px;
    max-width: 256px;
  }
}

.editor__tag-preview {
  img {
    max-width: 200px;
  }
  figcaption {
    text-align: center;
  }
  .left {
    float: left;
    margin: 0 1em 1em 0;
  }
}
</style>