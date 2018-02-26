<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  };
</script>

<style lang="scss">
  @import './assets/css/main.css';
  @import './assets/css/dialogs.css';
  @import './assets/css/animations.css';
  @import './assets/css/vue.css';

  #app {
    height: 100%;

  }
</style>