<template>
  <div class="board">
      <div v-if="welcomePage === true" class="opening">
          <form style="padding:50px;" >
                <div class="form-group" style="display:flex;justify-content:center;flex-direction:column;align-items:center;margin-top:50px;">
                    <h3 style="margin-top:30px;">Welcome to</h3>
                    <h1 style="margin-top:-10px;">KING of TYPING</h1>
                    <hr>
                    <p style="margin-top:-10px;">INSERT PLAYER NAME</p>
                    <input v-model="playerName" type="text" class="form-control" id="exampleFormControlInput1" placeholder="player name" style="margin-bottom:20px;"> 
                    
                    <button type="button" @click="joinPlayer" class="btn btn-primary" data-dismiss="modal">Play</button>
                </div>
            </form>
      </div>

      <!-- <div v-if="welcomePage === false && waitingRoom === true" class="opening" style="display:flex;justify-content:center;align-content:center;flex-direction:column">
          <h3 style="margin-top:150px">waiting for another player....</h3>
          <img src="https://i.pinimg.com/originals/26/bb/4f/26bb4f08d445790b80e7a1d90dfb65ab.gif" style="height:250px;">
      </div> -->

      <div v-if="welcomePage === false" class="main-content" >
        <h3 style="margin-top:30px;">Welcome to</h3>
        <h1 style="margin-top:-10px;">KING of TYPING</h1>
        <hr style="width:10%;margin:10px">
            <b-button style="margin:5px;width:200px;border-radius:20px;" data-toggle="modal" data-target="#exampleModalCenter" variant="warning">Create Rooms</b-button>
            <h6> or join rooms</h6>
        <div class="rooms" v-for="(room,index) in this.$store.state.rooms" :key="index">
                <b-button @click.prevent="room && joinRoom(room.roomName,index)" style="margin:5PX;width:200px;border-radius:20px;" variant="info">{{room.roomName}}</b-button>
        </div>
            <!-- Modal -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create room</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form style="padding:50px;">
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Room Name</label>
                        <input v-model="name" type="text" class="form-control" id="exampleFormControlInput1" placeholder="room name">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Number of players</label>
                        <select v-model="numberOfPlayer" class="form-control" id="exampleFormControlSelect1">
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        </select>
                    </div>
                </form>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" @click="createRoom" class="btn btn-primary" data-dismiss="modal">Create Room</button>
                </div>
                </div>
            </div>
            </div>
            <!-- Modal -->
      </div>
      
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            name:'',
            numberOfPlayer :'',
            playerName:'',
            waitingRoom:true,
            welcomePage:true
        }
    },
    methods: {
        joinRoom(roomName,index){
            let payload = {
                roomName : roomName,
                player : localStorage.getItem('player')
            }
            localStorage.setItem('room',roomName)
            localStorage.setItem('roomIndex',index)
            // this.$router.push(`/waiting/${index}`)
            this.$store.dispatch('joinRoom',payload)
        },
        joinPlayer(){
            localStorage.setItem('player',this.playerName)
            this.$router.push(`/`)
            this.welcomePage=false
        },
        createRoom(){
            let payload = {
                roomName : this.name,
                numberOfPlayers : this.numberOfPlayer,
                players : [localStorage.getItem('player')],
                progress : [0],
                inRace : false
            }
            Swal.fire(
                'Room Created!',
                'Lets wait for the challengers!',
                'success'
            )
            
            localStorage.setItem('room',this.name)
            this.$store.dispatch('createRoom',payload)
        },
    },
    created(){
        if(localStorage.getItem('player')){
            this.welcomePage = false
        }else{
            this.welcomePage = true
        }
        this.$store.dispatch('getRooms')
    },
    computed: {
        ...mapState(['rooms'])
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