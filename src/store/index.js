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
    lintasan : [],
    rooms : []
  },
  mutations: {
    GET_DATA(state,payload){
      state.lintasan = payload
    },
    GET_ROOMS(state,payload){
      state.rooms = payload
    }
  },
  actions: {
    createRoom({dispatch},payload){
      return db.collection('rooms').doc(payload.roomName).set(payload)
                .then(success => {
                    dispatch('getRooms')
                })
                .catch(err => {
                  console.log(err)
                })
    },
    getData({commit}){
      let lintasan = []
      db.collection('lintasan').onSnapshot(querySnapshot => {
        querySnapshot.forEach(lintasanData => {
          lintasan.push(lintasanData.data())
          })
      })
      commit('GET_DATA',lintasan)
    },
    getRooms({commit}){
      let rooms = []
      db.collection('rooms').onSnapshot(querySnapshot => {
        querySnapshot.forEach(room => {
          rooms.push(room.data())
          })
      })
      console.log(rooms.length,'from get Roomss')
      commit('GET_ROOMS',rooms)
    }
  },
  modules: {
  }
})
