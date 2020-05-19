<template>
<div id="app">
  <div class="main-container">
        <header>
            <h1>
                История развития фирмы &laquo;Мебель&raquo;
            </h1>
            <div class="bubble-enlarge" id="bubble-enlarge"></div>
        </header>
  <router-view/>
  </div>
  </div>
</template>


<script>
export default {
  name: "App",

data() {
    return {
      dummyWidth: 0
      }
  },


  mounted() {
       this.dummyWidth = this.$children[0].$refs.scaleL.scaleLength * 2.3 + 'px'
     

  },

   computed: {
     
  },

  methods: { },

    
}


</script>

<style lang="scss">
body, html {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
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

.main-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 40% 60%;
  overflow: hidden;
  background-image: linear-gradient(to right top, #c9b6a7, #c4bba7, #bcc1ab, #b3c6b3, #abcabf, #abc9be, #abc8bd, #abc7bc, #b2c1b0, #b8baa9, #bcb4a5, #bcaea5);
}

.scroll-dummy {
    //width: 180%;
    height: 100%;
}

</style>