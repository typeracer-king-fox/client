<template>
  <div class="board">
      
      <div v-if="welcomePage === false && waitingRoom === true" class="opening" style="display:flex;justify-content:center;align-content:center;flex-direction:column;max-width:400px">
            <h3 style="margin-top:100px">waiting for another player....</h3>
            <img src="https://i.pinimg.com/originals/26/bb/4f/26bb4f08d445790b80e7a1d90dfb65ab.gif" style="height:250px;">
            <div>
            <!-- {{getRoomDetail}} -->
           <center> Room Name : {{roomDetail.roomName}}</center>
          <center> Player Joined : {{getRoomDetail.players.toString()}} </center>  
            <button v-if="getRoomDetail.numberOfPlayers <= getRoomDetail.players.length" style="position:absolute;top:53%;left:45%" type="button" @click="startGame" class="btn btn-primary btn-lg" data-dismiss="modal">Start Game</button>         
            </div>
      </div>
 
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            waitingRoom:true,
            roomDetail:{},
        }
    },
    methods: {
        startGame() {
            // this.$router.push({name: 'play'})
            this.$store.dispatch('startGame', this.roomDetail.roomName)
        }
    },
    created(){
        if(localStorage.getItem('player')){
            this.welcomePage = false
        }
        this.$store.dispatch('getRoomDetail',localStorage.getItem('room'))
    },
    computed: {
        // ...mapState(['roomNow']),

        getRoomDetail(){
            // console.log(this.$store.state.roomNow)
            // return this.$store.dispatch('getRoomDetail',localStorage.getItem('room'))
            this.roomDetail = this.$store.state.roomNow
            return this.$store.state.roomNow
        },
        getDetail(){
            
        },

        ...mapState(['roomNow'])

        // startingRace() {
        //     console.log('startingRace computed sdfasf -------------------------')
        //     if(this.$store.state.roomNow.inRace) {
        //         console.log('computed starting race triggered, starting the typerace')
        //         return this.$router.push('/play')
        //     }
        // }

        // ...mapState(['roomNow'])
        // afunction() {
        //     this.$router.push('/play')
        // }
    },
    watch: {
        roomNow: function(newVal, oldVal) {
            
            if(newVal.inRace === true) this.$router.push('/play')
        }
        
        
        
    },
    beforeRouteLeave (to, from, next) {
      if (!to.params.id || to.params.id !== localStorage.getItem('room')) {
        const payload = {
          roomName: localStorage.getItem('room'),
          playerName: localStorage.getItem('player')
        }
        this.$store.dispatch('deletePlayerFromRoom', payload)
        localStorage.removeItem('room')
        localStorage.removeItem('roomIndex')
      }
      // this.$router.push('/')
      // console.log('ini to di before route leave rooms', to)
    }
}
</script>

<style>
h1{
    color:rgb(59, 59, 59)
}

.rooms{
    overflow:scroll;

    max-height:200px;width:500px;
    overflow:scroll;
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center
}
.main-content{
    
    height:400px;
    margin-top:100px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}

.board{
    background-size: cover;
    background-position:center;
    background-repeat:no-repeat;
    background-image: url("../assets/background-images.jpg");
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
}
hr {
    border: 0;
    border-bottom: 1px solid rgb(145, 145, 145); 
}

p{
    margin:0px
}

</style>