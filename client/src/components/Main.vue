<template>
  <div class="main-container">
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-4 col-md-3 sidebar file-tree animated slow fadeIn" ng-include="config.tplPath + '/sidebar.html'" ng-show="config.sidebar &amp;&amp; fileNavigator.history[0]">
          <sidebar></sidebar>
        </div>

        <div class="main col-sm-8 col-md-9" ngf-model-options="{updateOn: 'drop', allowInvalid: false, debounce: 0}" ngf-drop="addForUpload($files)"
          ngf-drag-over-class="'upload-dragover'" ngf-multiple="true">
          <div ng-include="config.tplPath + '/' + viewTemplate" class="main-navigation clearfix">
            <main-table v-if="view==='table'"></main-table>
            <icon-view v-if="view==='icon'"></icon-view>
          </div>
        </div>
      </div>

      <!-- <div ng-include="config.tplPath + '/modals.html'"></div> -->
      <!-- <div ng-include="config.tplPath + '/item-context-menu.html'"></div> -->
    </div>
    <item-context-menu></item-context-menu>
    <modals></modals>
  </div>

</template>

<script>
  import Navbar from '@/components/Navbar';
  import Sidebar from '@/components/Sidebar';
  import MainTable from '@/components/MainTable';
  import ItemContextMenu from '@/components/ItemContextMenu';
  import IconView from '@/components/IconView';
  import Modals from '@/components/Modals';
  import {
    mapGetters,
    mapState,
    mapActions
  } from 'vuex';

  export default {
    components: {
      Navbar,
      Sidebar,
      MainTable,
      ItemContextMenu,
      IconView,
      Modals
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['currentPath', 'fileList', 'basePath', 'view'])
    },
    methods: {
      ...mapActions([
        'loadData', 'setCurrentPath', 'toggleView'
      ]),
    }
  };
</script>


<style>
  .main-container {
    height: 100%;
    position: relative;
  }
</style>