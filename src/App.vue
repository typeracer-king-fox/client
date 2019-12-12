<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase/app'

require("firebase/firestore")

  var firebaseConfig = {
    apiKey: "AIzaSyDcowEaERZ0TpZVtt1V_mJqhX3ZJoMIUuo",
    authDomain: "typeracer-kingfox.firebaseapp.com",
    databaseURL: "https://typeracer-kingfox.firebaseio.com",
    projectId: "typeracer-kingfox",
    storageBucket: "typeracer-kingfox.appspot.com",
    messagingSenderId: "342306038905",
    appId: "1:342306038905:web:7942bf507373dcce38a0a8",
    measurementId: "G-MNJQPBFSCP"
  }

  firebase.initializeApp(firebaseConfig)
  let db = firebase.firestore()

  export default {
    name : 'typeracer',
    data(){
      return {
        lintasan : [],
        player : [],
      }
    },
    methods: {
      getData(){
        db.collection('lintasan').onSnapshot(querySnapshot => {
          querySnapshot.forEach(lintasanData => {
            
            this.lintasan.push(lintasanData.data())
            })
            console.log(this.lintasan[0].content)
        })
      }
    },
    mounted(){
      this.getData()
    },
  }
</script>

<style>


</style>

