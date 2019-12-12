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
    rooms: [],
    randLintasan: ''
  },
  mutations: {
    GET_DATA (state, payload) {
      state.lintasan = payload
    },

    FILL_ROOMS (state, payload) {
      state.rooms = payload.rooms
    },

    FILL_RAND_LINTASAN (state, payload) {
      const index = Math.floor(Math.random() * state.lintasan.length)
      state.randLintasan = state.lintasan[index]
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

    createRoom ({ commit }, payload) {
      db.collection('rooms')
        .add(payload)
        .then(function (docRef) {
          // console.log('Document written with ID: ', docRef.id)
          // commit('FILL_RAND_LINTASAN')
          this.getRooms()
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    },

    deleteRoom ({ commit }, { roomName }) {
      db.collection('rooms')
        .doc(roomName)
        .delete()
        .then(function () {
          // console.log('Document successfully deleted!')
          // commit('FILL_ROOMS')
          this.getRooms()
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    },

    startRace ({ commit }, { roomName }) {
      db.collection('rooms')
        .doc(roomName)
        .update({ inRace: true })
        .then(function () {
          // console.log('Document successfully updated!')
          // commit('FILL_ROOMS')
          this.getRooms()
        })
        .catch(function (error) {
          console.error('Error updating document: ', error)
        })
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
      let roomIsFull = false
      let roomIndex = -1

      for (let index in this.state.rooms) {
        if (this.state.rooms[index].id === payload.roomName) {
          roomIndex = index

          if (this.state.rooms[index].players.length === payload.numberOfPlayers) {
            roomIsFull = true
            break
          }
        }
      }

      if (!roomIsFull) {
        this.state.rooms[roomIndex].players.push(payload.playerName)
        const roomRef = db.collection('rooms').doc(payload.roomName)
        roomRef.update({
          players: this.state.rooms[roomIndex].players
        })

        this.getRooms()
      }
    }
  },
  modules: {
  }
})
