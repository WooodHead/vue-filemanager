<template>

  <div>
    <b-card v-bind:header="header" header-tag="header" v-bind:title='title'>
      <slot></slot>
    </b-card>
  </div>

  <!-- card-header-footer-1.vue -->

</template>

<script>
  export default {
    data() {
      return {}
    },
    props: [
      'title',
      'header'
    ]

  }

</script>


<style>
  .card {
    width: 50%;
    margin: 3rem auto;
  }

</style>
