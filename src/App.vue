<template>
  <div id="app">   
    <router-view/>
  </div>
</template>

<script>
  import {mapState} from '../src/store/index'
  export default {
    name : 'home-page',

    data(){
      return {
        player : [],
      }
    },
    methods: {

    },
    created(){
      this.$store.dispatch('getData')
    }

  }
</script>

<style>

</style>
