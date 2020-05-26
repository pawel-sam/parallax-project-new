<template>
  <parallax/>
</template>

<script>
// import axios from 'axios'
// import Scale from '@/components/Scale'
// import Scroller from '@/components/Scroller'
// import Tag from '@/components/Tag'
 import Parallax from '@/components/Parallax';

export default {
  name: "Home",
  components: {
    Parallax
  },

  data() {
    return {
      scale: {},
      scaleLength: 35,
      offsetParallax: 0,
      tagsData: null
    };
  },

  // created() {
  //   //this.getData()
  // },

  // mounted() {
  //   this.scaleLength = this.$refs.scaleL.scaleLength
  // },

  // computed: {
  //   scaleFullWidth: function () {
  //     return  this.scaleLength + 20 + 'px'
  //   }
  // },

  // methods: {
  //   wheelHandler(event) {
  //     console.log(event.target.scrollBy)
  //     event.view.scrollBy({left:event.deltaY, top:0, behavior: 'smooth'})
  //   },

  //   scrollParallax(data) {
  //     this.offsetParallax = data - 20;
  //   },

  //    wheelScrollingOffset(event) {
  //    this.$root.$emit('wheelScroll', event.deltaY)
  //   },

  //   async getData() {
  //     try {
  //       const result = (await axios.get('/')).data
  //       if (result) {
  //         console.log(result)
  //         this.scale = result
  //       }
  //     }
  //     catch (e) { console.error(e) }
  //   }

  //   }
}


</script>

<style lang="scss">

</style>