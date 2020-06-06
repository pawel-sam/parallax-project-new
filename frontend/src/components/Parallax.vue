<template>
    <main class="parallax-container" @wheel.passive="wheelScrollingOffset">
    <!-- <TagLayer :transmittedWidth = "scaleFullWidth" :offsetParallax = "offsetParallax" :order = "1"/>  :style="{width: scaleFullWidth, transform: 'translateX(' + offsetParallax*0.6 + 'px)'}" -->
    <div class="parallax-layer-2 parallax-layer parallax_container_level-2" >
      <scale
      :startDate="2010"
      :endDate="2028"
      :step="1"
      :ratio="1.0"
    />
    </div>
    <div class="parallax-layer-1 parallax-layer parallax_container_level-1">
      <scale
      v-on:returnScaleLength = "getScrollLength"
      :startDate="2010"
      :endDate="2028"
      :step="1"
      :ratio="1.0"
    />
    </div>
<!-- <scroller :scrollDummyWidth="scaleLength"  v-on:offsetX = "scrollParallax" />
<editor/> -->
  </main>
</template>


<script lang="js">
  //import Scroller from '@/components/Scroller'
  //import TagLayer from '@/components/TagLayer'
  import Scale from '@/components/Scale'
  //import Editor from '@/components/Editor'
  
export default {
  name: "Parallax",
    components: {
    Scale,
    //Scroller,
    //TagLayer,
    //Editor
  },
  data() {
    return {
      scale: {},
      scaleLength: 35,
      offsetParallax: 0,
      tagsData: null,
      }
  },
  created() {
    //this.getData()
  },
  computed: {
    scaleFullWidth: function () {
      return  this.scaleLength + 100 +'px'
    }
  },
  methods: {
    getScrollLength(length) {
      this.scaleLength = length + 100
    },
    scrollParallax(data) {
      this.offsetParallax = data - 20;
    },
    //  wheelScrollingOffset(event) {
    //    this.$root.$emit('wheelScroll', event.deltaY)
    // },
    }
}
</script>

<style lang="scss">
   
.parallax-container {
  min-width: 100%;
}

.parallax-layer {
  height: 30%;
  min-width: 100%;
}

.parallax_container_level-1 {
  position: absolute;
  left:0;
  top: 70%;
}

.parallax_container_level-2 {
  position: fixed;
  left:0;
  top:40%;
}



.parallax-layer-2 {
  background-image: url("../images/skale.svg");
  background-size: cover;
}

// .parallax-layer-2 div {
//   transform: scale(0.6, 0.6);
//   transform-origin: left;
// }

.parallax-layer-1 {
  background-image: url("../images/skale2.svg");
  background-size: cover;
  box-shadow: 0 -20px 20px rgba(0, 0, 0, 0.5);
}
</style>