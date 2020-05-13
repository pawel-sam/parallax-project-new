<template>
  <div class="parallax-container"  @wheel.prevent="wheelHandler">
    
    <div 
      class="relax parallax-layer-1"
      v-rellax="{
      speed: 12,
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
      speed: 25,
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
    />
    </div>

    <!-- <scale 
      :startDate="2010"
      :endDate="2028"
      :step="1"
    /> -->
    
  </div>
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
      scale: {}
    }
  },

  created() {
    this.getData()
  },

  methods: {
    wheelHandler(event) {
      // console.log(event)
      event.view.scrollBy({left:event.deltaY, top:0, behavior: 'smooth'})
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
}

.parallax-layer-2 {
    background-color: cadetblue;
    box-shadow: 0 -20px 20px rgba(0, 0, 0, 0.5);
    text-align: center;
}

.relax {
  display: flex;
  align-items: flex-end;
  width: fit-content;

  // width: 3000px;
  height: 300px;
  // border: 2px solid black;
}
</style>
