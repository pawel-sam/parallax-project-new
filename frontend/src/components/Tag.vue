<template>
    <div v-on:click="openCard()" class="container">
        <div v-if=!isOpened class="tag-flag">
            <h1 class="annotation">{{annotation}}</h1>
            <div class="photo"></div>
        </div>
        <div v-if=isOpened class="tag-card">
            <h1 class="annotation">{{annotation}}</h1>
            <div class="photo"></div>
            <div class="fullText">
                {{fullText}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Tag",
        props: {
            version: Number,
            scaleId: Number,
        },
        data() {
            return {
                annotation: "Первое погружение",
                fullText: "Для того, чтобы приехать на море и пойти нырять с дайвцентром, лучше отучиться." +
                " Для рекреационного дайвинга, самого простого, есть 2 уровня - OWD (Open Water Diver)" +
                " и AOWD (Advanced Open Water Diver). В принципе, и тот, и другой имеет право прийти и присоединиться к группе, " +
                "но есть ограничения - OWD может погружаться до 18 метров, AOWD - до 30 метров. Ну и у AOWD подготовка пошире -" +
                " при обучении проходится и ориентирование," +
                " и ночные погружения, и еще всякие дополнительные штуки.",
                isOpened: false,
                position: Number,
                type: String,
                imageId: Number,
            }
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
                const template = 'ABCDEFGHIJKLMNOPQRSTUYQVWZXYZabcdefghijklmnopqrstuvwxyz1234567890';
                this.imageId = '';
                for (let i = 0; i < 6; i++) {
                    this.imageId += template[Math.floor(Math.random() * template.length)];
                }
            },
            openCard() {
                this.isOpened = !this.isOpened;

            }
        }
    }
</script>
<style scoped>
    .tag-flag {
        width: 120px;
        height: 120px;
        background-image: url("img/tag.svg");
        position: absolute;
        top: -50%;
        left: 30%;
    }

    .tag-card {
        width: 1300px;
        height: 300px;
        background: #abc7bc;
        position: absolute;
        z-index: 8;
        top: -95%;
        left: 3%;
    }

    .tag-card > .photo {
        background-image: url("img/daiving.jpg");
        width: 95%;
        top: 10px;
        left: 0;
    }

    .annotation {
        font-size: 10px;
        color: white;
        margin-left: 10px;
    }

    .photo {
        background-image: url("img/daivingmini.jpg");
        background-size: cover;
        margin-left: 20px;
        margin-top: 11px;
        width: 90px;
        height: 65px;
    }
    .fullText {
        margin-top: 20px;
        text-align: center;
        font-size: 16px;
    }
</style>
