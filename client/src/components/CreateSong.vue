<template>
  <div>
    <card header='Create'>

      <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <b-form-group id="exampleInputGroup1" label="Title:" label-for="title" description="We'll never share your email with anyone else.">
          <b-form-input id="title" type="text" v-model="song.title" required placeholder="Enter title">
          </b-form-input>
        </b-form-group>

        <b-form-group id="exampleInputGroup1" label="Artist:" label-for="artist" description="We'll never share your email with anyone else.">
          <b-form-input id="artist" type="text" v-model="song.artist" required placeholder="Enter artist">
          </b-form-input>
        </b-form-group>




        <b-form-group id="exampleGroup4">
          <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
            <b-form-checkbox value="me">Check me out</b-form-checkbox>
            <b-form-checkbox value="that">Check that out</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button variant="primary" @click="create">Submit</b-button>
        <!-- <b-button  type="submit" variant="primary" @click="create">Submit</b-button> -->
        <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
      </b-form>
    </card>
  </div>
</template>

<script>
  import SongsService from '@/services/SongsService'

  import Card from '@/components/Card';
  export default {
    components: {
      Card
    },
    data() {
      return {
        song: {
          title: null,
          artist: null,
          genre: null,
          album: null,
          albumImageUrl: null,
          youtubeId: null,
          lyrics: null,
          tab: null
        },
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{
            text: 'Select One',
            value: null
          },
          'Carrots', 'Beans', 'Tomatoes', 'Corn'
        ],
        show: true
      }
    },
    methods: {
      async create() {
        console.log('create')
        var aa = await SongsService.post(this.song)
        console.log('aa', aa.data)
        this.$router.push({
          name: 'songs'
        })
      },
      onSubmit(evt) {
        evt.preventDefault();
        alert(JSON.stringify(this.form));
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.email = '';
        this.form.name = '';
        this.form.food = null;
        this.form.checked = [];
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      }
    }
  }

</script>

<style>


</style>
<!-- b-form-1.vue -->
