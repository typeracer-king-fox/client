import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

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

export default new Vuex.Store({
  state: {
    lintasan : []
  },
  mutations: {
    GET_DATA(state,payload){
      state.lintasan = payload
    }
  },
  actions: {
    getData({commit}){
      let lintasan = []
      db.collection('lintasan').onSnapshot(querySnapshot => {
        querySnapshot.forEach(lintasanData => {
          lintasan.push(lintasanData.data())
          })
      })
      commit('GET_DATA',lintasan)
    }
  },
  modules: {
  }
})
