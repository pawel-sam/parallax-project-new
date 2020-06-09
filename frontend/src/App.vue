<template>
    <div id="app" @wheel.passive="wheelScrolling">
            <router-view/>
    <scroller/>
    </div>
</template>


<script lang="js">
import Scroller from '@/components/Scroller'

export default {
  name: "App",

  components: {
    Scroller,
  },

  data () {
      return {
          wheelScroll: 0,
      }
  },

  computed: {

  },

  methods: {
    wheelScrolling(event) {
          this.$store.commit('wheelScrollingDetect', event.deltaY)
      },
  }

}
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }

    body, html {
        height: 100%;
        width: 100%;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        width: 100%;
    }

</style>