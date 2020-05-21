<template>
  <main class="parallax-container"  @wheel.prevent="wheelScrollingOffset">
    <tag
            :scaleId="id"
            :version="1.0">

    </tag>

    <div class="parallax-layer-2 parallax-layer" :style="{width: scaleFullWidth, transform: 'translateX(' + offsetParallax*0.6 + 'px)'}">
      <scale
      :startDate="2010"
      :endDate="2028"
      :step="1"
      :ratio="0.95"
    />
    </div>
    <div class="parallax-layer-1 parallax-layer" :style="{width: scaleFullWidth, transform: 'translateX(' + offsetParallax + 'px)'}">
      <scale
      :startDate="2010"
      :endDate="2028"
      :step="1"
      :ratio="1.0"
      ref="scaleL"
    />
    </div>
        <div class="parallax-layer-2-tag parallax-layer" :style="{width: scaleFullWidth, transform: 'translateX(' + offsetParallax + 'px)'}">
       <tag
              :version = 1
              :scaleId = 2
      /> 
    </div>
    <div class="parallax-layer-1-tag parallax-layer" :style="{width: scaleFullWidth, transform: 'translateX(' + offsetParallax + 'px)'}"></div>

<scroller :scrollDummyWidth="scaleLength" v-on:offsetX = "scrollParallax" />

  </main>
</template>

<script>
import axios from 'axios'
import Scale from '@/components/Scale'
import Scroller from '@/components/Scroller'
import Tag from '@/components/Tag'
export default {
  name: "Home",
  components: {
    Scale,
    Scroller,
    Tag
  },

  data() {
    return {
      scale: {},
      scaleLength: 35,
      offsetParallax: 0,
      tagsData: null
      }
  },

  created() {
    //this.getData()
  },

  mounted() {
    this.scaleLength = this.$refs.scaleL.scaleLength

    // axios
    //   .get('/')
    //   .then(response => (this.tagsData = response))
    //   .catch(error => console.log(error))


  },

  computed: {
    scaleFullWidth: function () {
      return  this.scaleLength + 20 + 'px'
    }
  },

  methods: {
    wheelHandler(event) {
      console.log(event.target.scrollBy)
      event.view.scrollBy({left:event.deltaY, top:0, behavior: 'smooth'})
      //console.log(this.scaleLength)

    },

    scrollParallax(data) {
      this.offsetParallax = data - 20;
    },

     wheelScrollingOffset(event) {
     this.$root.$emit('wheelScroll', event.deltaY)
    },

    async getData() {
      try {
        const result = (await axios.get('/')).data
        if (result) {
          console.log(result)
          this.scale = result
        }
      }
      catch (e) { console.error(e) }
    }

    }
}


</script>

<style lang="scss">

.parallax-container {
    height: 100%;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
    width: 100vw;
    overflow: hidden;
}

.parallax-layer {
    text-align: center;
    height: 50%;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
}


.parallax-layer-2 {
  background-image: url("../img/skale.svg");
  background-size: cover;
}

.parallax-layer-2 div {
  transform: scale(0.8, 0.8);
  transform-origin: left;
}

.parallax-layer-1 {
  background-image: url("../img/skale2.svg");
  background-size: cover;
    box-shadow: 0 -20px 20px rgba(0, 0, 0, 0.5);
}
</style>