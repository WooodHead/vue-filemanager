<template>
  <div>

    <ul class="nav nav-sidebar file-tree-root">
      <li v-for="item in history" :class="{active:item.name === currentPath.join('/')}">
        <folder-branch-item :item="item"></folder-branch-item>
      </li>
      <!-- <li ng-repeat="item in fileNavigator.history" ng-include="'folder-branch-item'" ng-class="{'active': item.name == fileNavigator.currentPath.join('/')}"></li> -->
    </ul>
  </div>

</template>


<script>
  import FolderBranchItem from '@/components/FolderBranchItem';

  import {
    mapGetters
  } from 'vuex';
  import {
    mapActions
  } from 'vuex';

  export default {
    components: {
      FolderBranchItem
    },
    data() {
      return {};
    },
    mounted() {
      // console.log('this.currentPath', this.currentPath);
      console.log('this.history', this.history);
      // console.log('item.name', this.history[0].name);
      console.log('this.currentPath', this.currentPath.join('/'));
    },
    computed: {
      ...mapGetters(['currentPath', 'fileList', 'basePath', 'history'])
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
