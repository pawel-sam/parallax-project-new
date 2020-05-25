<template>
    <div class="scroll-container" id="scroll-container"  @scroll.prevent="dummyOffset">
        <div  class="scroll-dummy" id="scroll-dummy" :style="{width: scrollDummyWidth + 'px'}"></div>
    </div>
</template>
<script>

export default {
 name: "Scroller",
 props: {
    scrollDummyWidth: Number,
    scrollValue: Number
 },

 data () {
   return {
     wheelScrollingOffsetValue: 0
   }
 },

 methods: {
  dummyOffset() {
      this.$emit('offsetX', document.getElementById('scroll-dummy').getBoundingClientRect().left)
    }
    },

   mounted() {
     this.$root.$on('wheelScroll', function (delta) {
       this.wheelScrollingOffsetValue = delta
        document.getElementById("scroll-container").scrollBy({left: delta, top: 0, behavior: "smooth"})
     })
  
  },

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

.scroll-dummy {
  left:0px;
}

</style>