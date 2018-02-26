<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="javascript:void(0)" @click="goTo(-1)">
          File Manager
          </a>
      </li>
      <li v-for="(dir,key) in currentPath" :key="key" class="breadcrumb-item">
        <a href="javascript:void(0)" @click="goTo(key)">{{dir}}</a></li>
    </ol>

  </div>


</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    mapActions
  } from 'vuex';

  export default {
    components: {},
    data() {
      return {};
    },
    mounted() {
      console.log('this.currentPath', this.currentPath);
    },
    computed: {
      ...mapGetters(['currentPath', 'fileList', 'basePath'])
    },
    methods: {
      ...mapActions([
        'loadData', 'setCurrentPath', 'goTo'
      ]),
    }
  };

</script>


<style>
  .breadcrumb-item+.breadcrumb-item::before {
    color: #FFF;
    font-size: 17px;
  }

</style>
