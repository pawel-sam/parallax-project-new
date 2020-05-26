<template>
    <div v-if="false" class="container">
        <input v-model="annotation"  class="annotation">
        <form action="/image/1" method="post" enctype="multipart/form-data" class="uploader">
            <input type="file" name="tagImage"/>
            <input type="submit" name="submit"/>
        </form>
        <textarea v-model="fullText" name="fullText" id="fullText" cols="30" rows="6"></textarea>
        <div v-if="false" class="tag">
            {{annotation}}
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
                annotation: "Название события",
                fullText: "Добавить текст",
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
                if(this.imageId === null) {
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
            }
        }
    }
</script>
<style scoped>
    .container {
        width: 100%;
        height: 1500px;
        background-color: #C4C4C4;
    }

    .annotation {
        width: 70%;
        height: 70px;
        /*margin-left: 5%;*/
        margin-top: 4%;
        text-align: center;
        font-size: 40px;
    }

    .uploader {
        width: 70%;
        height: 70px;
        /*margin-top: 15%;*/
        margin-left: 15%;
    }

    input[type="file"], input[type="submit"] {
        display: block;
        margin: 10px;
    }

    #fullText {
        width: 70%;
        position: absolute;
        left: 15%;
        bottom: 4%;
        font-size: 20px;
    }

    .tag {
        width: 100px;
        height: 100px;
    }

</style>