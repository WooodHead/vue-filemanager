<template>
  <div>
    <songs-panel />


    <div class="card">
      <!-- <img class="card-img-top" data-src="holder.js/100x180/?text=Image cap" alt="Card image cap"> -->
      <div class="card-body">
        <h4 class="card-title">Title</h4>
        <p class="card-text">Text</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class='list-group-item' v-for="song in songs">
          {{song.title}}
        </li>
      </ul>
    </div>
    <table class="table">
      <tbody>
        <tr v-for="song in songs">
          <td scope="row"></td>
          <td>{{song.title}}</td>
          <td>{{song.artist}}</td>
        </tr>
      </tbody>
    </table>
    <p>{{songs.length}}</p>
    <div v-for="song in songs">
      <ul class='list-group'>
        <li class='list-group-item'>
          <a href="">{{song.title}}</a>
        </li>
      </ul>

    </div>
  </div>

</template>

<script>
  import SongsPanel from './SongsPanel'

  import SongsService from '@/services/SongsService'
  export default {
    components: {
      SongsPanel
    },
    data() {
      return {
        songs: []
      }
    },
    async mounted() {
      this.songs = (await SongsService.index()).data
    }

  }

</script>


<style>


</style>
