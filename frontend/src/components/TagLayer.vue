<template>
<div class="parallax_container_level-1" :style="{width: transmittedWidth, transform: 'translateX(' + offsetParallax + 'px)'}">
   <tag 
             :scaleId="1235"
            :version="1.0"
    >
   </tag>
</div>

</template>
<script>
  import Tag from '@/components/Tag'

 export default {
  name: "TagLayer",
   components: {
     Tag
  },
  props: {
   version: Number,
   transmittedWidth: Number,
   offsetParallax: Number
        },

  data() {
    return {

       }
        },

  methods: {
            calculatePosition() {
                //this.position;
            },
        }
    }

</script>
<style >

</style>

