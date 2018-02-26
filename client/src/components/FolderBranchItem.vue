<template>
  <div>
    <!-- <h1>{{item.name}}</h1> -->
    <a href="javascript:void(0)" @click="onClick(item)" class="animated fast fadeInDown text-justify">

      <span class="point">
        <i v-if="isInThisPath(item.name)" class="fa fa-chevron-down"></i>
        <i v-if="!isInThisPath(item.name)" class="fa fa-chevron-right"></i>
      </span>

      <i v-if="!isInThisPath(item.name)" class="fa fa-folder mr2"></i>
      <i v-if="isInThisPath(item.name)" class="fa fa-folder-open mr2"></i>
      {{ nameToShow }}
    </a>
    <ul class="nav-sidebar">
      <!-- <li ng-repeat="item in item.nodes" ng-include="'folder-branch-item'" ng-class="{'active': item.name == fileNavigator.currentPath.join('/')}"></li> -->

      <!-- <li v-for="n in item.nodes" :class="{active:item.name === currentPath.join('/')}"> -->
      <li v-for="n in item.nodes" :class="{active:n.name===currentPath.join('/')}" :data-name="n.name">
        <folder-branch-item :item="n "></folder-branch-item>
      </li>
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
    name: 'FolderBranchItem',
    props: ['item'],
    components: {
      FolderBranchItem
    },
    data() {
      return {};
    },
    mounted() {
      console.log('item.name', this.item.name);
      console.log('this.currentPath', this.currentPath.join('/'));

      // console.log('item', this.item);
      // console.log(' this.item.name.split(\'/\').pop();', this.item.name.split('/').pop());
    },
    computed: {
      isActive() {
        console.log('---this.item.name', this.item.name);
        console.log('---this.currentPath.join(\'/\')', this.currentPath.join('/'));
        return this.item.name === this.currentPath.join('/');
      },
      ...mapGetters(['currentPath', 'fileList', 'basePath']),
      nameToShow() {
        return this.item.name.split('/').pop() || this.basePath.join('/') || '/';
      }
    },
    methods: {
      ...mapActions([
        'loadData', 'setCurrentPath'
      ]),
      isInThisPath(path) {
        var currentPath = this.currentPath.join('/') + '/';
        return currentPath.indexOf(path + '/') !== -1;
      },
      onClick(item) {
        console.log('item', item);
        this.$store.dispatch('folderClick', item.item);
      }
    }
  };

</script>


<style scoped>
  ul {
    list-style: none;
  }

  .fa {
    font-size: 1.2em;
  }

  .point {
    width: 1em;
    display: inline-block;
  }

  .fa-folder,
  .fa-folder-open {
    margin-top: -2px;
  }

</style>
