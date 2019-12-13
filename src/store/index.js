import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
// import { componentsPlugin } from 'bootstrap-vue'
import router from '../router'
import Swal from 'sweetalert2'

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
    randLintasan: '',
    isFull : false,
    isWaiting : true,
    roomNow : {}
  },
  mutations: {
    GET_DATA (state, payload) {
      state.lintasan = payload
    },
    FILL_ROOMS (state, payload) {
      state.rooms = payload
    },

    FILL_RAND_LINTASAN (state, payload) {
      const index = Math.floor(Math.random() * state.lintasan.length)
      state.randLintasan = state.lintasan[index]
    },
    DETAIL_ROOM(state,payload){
      state.roomNow = payload
    }
  },
  actions: {
    createRoom({dispatch},payload){
      return db.collection('rooms').doc(payload.roomName).set(payload)
                .then(success => {
                    dispatch('getRooms')
                    console.log('created?? router jalan ga?')
                    router.push(`/waiting/${payload.roomName}`)
                })
                .catch(err => {
                  console.log(err)
                })
    },
  
    getData ({ commit }) {
      let lintasan = []
      db.collection('lintasan').onSnapshot(querySnapshot => {
        querySnapshot.forEach(lintasanData => {
          lintasan.push(lintasanData.data())
        })
      })
      commit('GET_DATA', lintasan)
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

    deletePlayerFromRoom ({ dispatch }, { roomName, playerName }) {
      // console.log('deleting player from room');
      db.collection('rooms')
        .doc(roomName)
        .update({
          players: firebase.firestore.FieldValue.arrayRemove(playerName)
        })
        .then(function () {
          dispatch('getRooms')
        })
        .catch(function (error) {
          console.error('Error deletePlayerFromRoom: ', error)
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
    
    getRooms({commit,state}){
      // console.log(state.rooms,'---------------------------')
      let rooms = []
      db.collection('rooms').onSnapshot(querySnapshot => {
        querySnapshot.forEach(room => {
          rooms.push(room.data())
        })
      })
      
      commit('FILL_ROOMS', rooms)
    },

    getRoomDetail({commit},payload){
      
      // let rooms = []
      db.collection('rooms').doc(payload).onSnapshot(querySnapshot => {
        // console.log(querySnapshot.data(),'--------------------')
        commit('DETAIL_ROOM',querySnapshot.data())
      })
        // .then(doc => {
        //   if (!doc.exists) {
        //   } else {
        //     console.log('trigered ga yak?')
        //     commit('DETAIL_ROOM',doc.data())
        //   }
        // })
        // .catch(err => {
        //   console.log('Error getting document', err);
        // });
    },

    joinRoom ({ dispatch }, payload) {
      let roomIsFull = false
      let roomIndex = -1
      
      for (let index in this.state.rooms) {
        if (this.state.rooms[index].roomName == payload.roomName) {
          console.log(this.state.rooms[index],payload.roomName)
          roomIndex = index
          if (this.state.rooms[index].players.length >= Number(this.state.rooms[index].numberOfPlayers)) {
            console.log('masuk kedalam room penuh')
            roomIsFull = true
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Room is full!',
            })
            
          }else{
            
            if (!roomIsFull) {
              console.log('masuk kedalam room belum penuh')
              // console.log(this.state.rooms[index].players.length,Number(this.state.rooms[index].numberOfPlayers),'---------------')
              let playerNow = this.state.rooms[index].players

              if(playerNow.indexOf(payload.player) == -1) {
                playerNow.push(payload.player);
              }
              router.push(`/waiting/${payload.roomName}`)

              const roomRef = db.collection('rooms').doc(payload.roomName)
              roomRef.update({
                players: playerNow
              })

              dispatch('getRooms')
              dispatch('getRoomDetail')
            }
          }
        }
      }
      
      
    }
  },
  modules: {
  }
})
