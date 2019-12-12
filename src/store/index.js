import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

require('firebase/firestore')

var firebaseConfig = {
  apiKey: 'AIzaSyDcowEaERZ0TpZVtt1V_mJqhX3ZJoMIUuo',
  authDomain: 'typeracer-kingfox.firebaseapp.com',
  databaseURL: 'https://typeracer-kingfox.firebaseio.com',
  projectId: 'typeracer-kingfox',
  storageBucket: 'typeracer-kingfox.appspot.com',
  messagingSenderId: '342306038905',
  appId: '1:342306038905:web:7942bf507373dcce38a0a8',
  measurementId: 'G-MNJQPBFSCP'
}

firebase.initializeApp(firebaseConfig)
let db = firebase.firestore()

export default new Vuex.Store({
  state: {
    lintasan: [],
    rooms: []
  },
  mutations: {
    GET_DATA (state, payload) {
      state.lintasan = payload
    },

    FILL_ROOMS (state, payload) {
      state.rooms = payload.rooms
    }
  },
  actions: {
    getData ({ commit }) {
      let lintasan = []
      db.collection('lintasan').onSnapshot(querySnapshot => {
        querySnapshot.forEach(lintasanData => {
          lintasan.push(lintasanData.data())
        })
      })
      commit('GET_DATA', lintasan)
    },

    getRooms ({ commit }) {
      const rooms = []

      db.collection('rooms').onSnapshot(querySnapshot => {
        querySnapshot.forEach(room => {
          rooms.push(room)
        })
      })

      commit('FILL_ROOMS', rooms)
    },

    // the payload should send:
    // 1. roomIndex to be joined
    // 2. guest's name
    joinRoom ({ commit }, payload) {
      const roomRef = db.collection('rooms').doc(payload.roomName)
      roomRef.update({
        player_1: payload.player_1,
        player_2: payload.player_2,
        player_3: payload.player_3,
        player_4: payload.player_4
      })

      this.getRooms()
    }
  },
  modules: {
  }
})
