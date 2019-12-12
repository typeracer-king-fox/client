<template>
  <div class="board">
      <div v-if="welcomePage === true" class="opening">
          <form style="padding:50px;">
                <div class="form-group">
                    <label for="exampleFormControlInput1">Player Name</label>
                    <input v-model="name" type="text" class="form-control" id="exampleFormControlInput1" placeholder="player name">
                    <button type="button" @click="joinPlayer" class="btn btn-primary" data-dismiss="modal">Play</button>
                </div>
            </form>
      </div>
      <div v-if="welcomePage === false" class="main-content" >
        <h3 style="margin-top:30px;">Welcome to</h3>
        <h1 style="margin-top:-10px;">KING of TYPING</h1>
        <hr style="width:10%;margin:10px">
            <b-button style="margin:5px;width:200px;border-radius:20px;" data-toggle="modal" data-target="#exampleModalCenter" variant="warning">Create Rooms</b-button>
            <h6> or join rooms</h6>
        <div class="rooms">
                <b-button v-for="(room,index) in this.$store.state.rooms" :key="index"  @click="joinRoom" style="margin:5PX;width:200px;border-radius:20px;" variant="info">{{room.roomName}}</b-button>
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

export default {
    data() {
        return {
            name:'',
            numberOfPlayer :'',
            playerName:'',
            welcomePage:true
        }
    },
    methods: {
        joinRoom(roomName){
            console.log('saiufgisaf');
            
            console.log(roomName)
        },
        joinPlayer(){
            localStorage.setItem('player',this.name)
            this.welcomePage=false
        },
        createRoom(){
            let payload = {
                roomName : this.name,
                numberOfPlayer : this.numberOfPlayer,
                players : [],
                inRace : false
            }
            localStorage.setItem('rooms',this.name)
            this.$store.dispatch('createRoom',payload)
            this.$router.push('/play')
        },
        joinRoom(){
            console.log(this.playerName)
        }
    },
    created(){
        if(localStorage.getItem('player')){
            this.welcomePage = false
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