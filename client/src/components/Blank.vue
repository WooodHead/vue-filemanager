<template>

</template>

<script>
  import {
    mapGetters,
    mapState,
    mapActions
  } from 'vuex';

  export default {
    components: {},
    data() {
      return {};
    },
    mounted() {

    },
    computed: {
      ...mapGetters(['currentPath', 'fileList', 'basePath'])
    },
    methods: {
      ...mapActions([
        'loadData', 'setCurrentPath'
      ]),
    }
  };

</script>


<style>


</style>
