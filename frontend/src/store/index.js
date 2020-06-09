import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    imgSource: '',
    parallaxScrollPosition: 0,
    wheelScrollDirection: 0,
    scaleLength: 0,
  },

  mutations: {
    wheelScrollingDetect(state, payload) 
    {
      state.wheelScrollDirection = payload <= 0 ? -1 : 1
      //console.log(state.parallaxScrollPosition)
      state.parallaxScrollPosition += payload
      
    },

    setScaleLength(state, scaleWidth) {
      state.scaleLength =  scaleWidth
     
    },
  },

  actions: {
  },

  modules: {
  }
})
