<template>
    <div class="scroll-container" id="scroll-container" @scroll.prevent="dummyOffset">
        <div class="scroll-dummy" id="scroll-dummy" :style="{width: scrollDummyWidth + 'px'}"></div>
    </div>
</template>
<script>

export default {
 name: "Scroller",
 props: {
   scrollDummyWidth: Number,
 },

  methods: {

    dummyOffset() {
      //console.log(event.target.scrollLeft)
      this.$emit('offsetX', document.getElementById('scroll-dummy').getBoundingClientRect().left)
    }


    }


    
}
</script>
<style scoped>
.scroll-container {
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 100;
    height: 2%;
    width: 100%;
    overflow: auto;
}

</style>