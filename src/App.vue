<template>
  <div id="app">
    <h1>{{this.$store.state.lintasan[0].content}}</h1>
    <!-- <h1>ahusdhkaushdka</h1> -->
    <router-view/>
  </div>
</template>

<script>
  import {mapState} from '../src/store/index'
  export default {
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

