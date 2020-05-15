<template>
  <main class="parallax-container" :style="{width: scaleFullWidth}"  @wheel.prevent="wheelHandler">
    
    <div 
      class="relax parallax-layer-1"
      v-rellax="{
      speed: 1,
      vertical: false,
      horizontal: true,
      wrapper: '.scroll-container'
    }"
    
    >
      <scale 
      :startDate="2010"
      :endDate="2028"
      :step="1"
      :ratio="0.95"
    />
      
    </div>
    <div 
      class="relax parallax-layer-2"
      v-rellax="{
      speed: 8,
      vertical: false,
      horizontal: true,
      wrapper: '.scroll-container'
    }"
    >
      <scale 
      :startDate="2010"
      :endDate="2028"
      :step="1"
      :ratio="1"
      ref = "scaleL"
    />
    </div> 

    <!-- <scale 
      :startDate="2010"
      :endDate="2028"
      :step="1"
    /> -->
    
  </main>
</template>

<script>
import axios from 'axios'
import Scale from '@/components/Scale'

export default {
  name: "Home",
  components: {
    Scale
  },

  data() {
    return {
      scale: {},
      scaleLength: 35
      }
  },

  created() {
    this.getData()
  },

  mounted() {
    this.scaleLength = this.$refs.scaleL.scaleLength
  },

  computed: {
    scaleFullWidth: function () {
      return  this.scaleLength + 'px'
    }
  },

  methods: {
    wheelHandler(event) {
      // console.log(event)
      event.view.scrollBy({left:event.deltaY, top:0, behavior: 'smooth'})
     // console.log(this.scaleFullWidth)
      
    },

    async getData() {
      try {
        const result = (await axios.get('/')).data
        if (result) { 
          this.scale = result
        }
      }
      catch (e) { console.error(e) }
    }

    }
}


</script>

<style scoped lang="scss">

.container {
  // height: 95vh;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
    height: 100%;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
    width: 100vw;
    overflow: hidden;
}

.parallax-container {
    height: 100%;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
    width: 100vw;
    overflow: hidden;
}

.parallax-layer-1 {
    background-color: antiquewhite;
    text-align: center;
    width: 100%;
}

.parallax-layer-2 {
    background-color: cadetblue;
    box-shadow: 0 -20px 20px rgba(0, 0, 0, 0.5);
    text-align: center;
    width: 100%;
}

.relax {
  display: flex;
  align-items: flex-end;
  //width: fit-content;

  // width: 3000px;
  height: 300px;
  // border: 2px solid black;
}
</style>