<template>
  <div id="playdiv">
    <div class="monitor flex-column d-flex justify-content-center bg-warning">
      <div class="d-flex position-relative">
        <h5 class="d-flex mr-2 playerName">Player 1:</h5>
        <div class="progress d-flex">
          <div class="progress-bar" :style="`width: ${this.progressP1}%`" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
      <div class="d-flex position-relative">
        <h5 class="d-flex mr-2 playerName">Player 2:</h5>
        <div class="progress d-flex">
          <div class="progress-bar" :style="`width: ${this.progressP2}%`" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
      <div class="d-flex position-relative">
        <h5 class="d-flex mr-2 playerName">Player 3:</h5>
        <div class="progress d-flex">
          <div class="progress-bar" :style="`width: ${this.progressP3}%`" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
      <div class="d-flex position-relative">
        <h5 class="d-flex mr-2 playerName">Player 4:</h5>
        <div class="progress d-flex">
          <div class="progress-bar" :style="`width: ${this.progressP4}%`" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
    <div class="sentence bg-info">
      <q>{{randLintasan.content}}</q>
    </div>
    <h3>Type the sentence above</h3>
    <div class="input">
      <form>
        <textarea v-model="playerInput" class="form-control" rows="3"></textarea>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'play',
  data: function () {
    return {
      playerInput: '',
      progressP1: 50,
      progressP2: 75,
      progressP3: 90,
      progressP4: 25
    }
  },
  computed: {
      ...mapState(['randLintasan'])
  },
  created () {
      this.$store.commit('FILL_RAND_LINTASAN')
  }
}
</script>

<style scoped>
#playdiv {
  background-image: url('../assets/background-images.jpg');
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.monitor {
  height: 20vh;
  padding: 1rem;
  border-radius: 1rem
}
.progress {
  width: 75vw;
  border-radius: 1rem
}
.playerName {
  position: relative;
  top: -.5vh
}
.sentence {
  margin-bottom: 4vh;
  margin-top: 4vh;
  padding: 1rem;
  border-radius: 1rem;
  width: 35vw;
  background-color: rgba(56, 208, 102, 0.5)
}
.input{
  border: 3px solid orange;
  border-radius: 1rem;
  overflow: hidden;
}
textarea {
  width: 25vw
}
</style>
