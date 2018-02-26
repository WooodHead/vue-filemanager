<template>

  <div class="iconset noselect">
    <div class="item-list clearfix"  ng-right-click="selectOrUnselect(null, $event)"
      prevent="true">
      <div class="col-120" v-for="item in sortedList" ng-show="!fileNavigator.requesting && !fileNavigator.error">
        <a href="javascript:void(0)" class="thumbnail text-center" @click="controller.selectOrUnselect(item, $event)" @dblclick="controller.smartClick(item)" @contextmenu="controller.contextMenuHanclder($event,item)" ng-dblclick="smartClick(item)" ng-right-click="selectOrUnselect(item, $event)"
          title="" :class="{selected: controller&&controller.isSelected(item)}">
          <div class="item-icon">

            <i class="fa fa-folder-open" v-if="item.model.type==='dir'"></i>
            <i class="fa fa-file-o" v-if="item.model.type==='file'"></i>

          </div>{{item.model.name }}
        </a>
      </div>
    </div>

    <div ng-show="fileNavigator.requesting">
      <div ng-include="config.tplPath + '/spinner.html'"></div>
    </div>

    <div class="alert alert-warning" ng-show="!fileNavigator.requesting && fileNavigator.fileList.length < 1 && !fileNavigator.error">
      <!-- {{"no_files_in_folder" }}... -->
    </div>

    <div class="alert alert-danger" ng-show="!fileNavigator.requesting && fileNavigator.error">
      <!-- {{ fileNavigator.error }} -->
    </div>
  </div>

</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import ViewController from '@/controllers/ViewController';

  export default {
    components: {},
    data() {
      return {
        controller: null
      };
    },
    mounted() {
      this.refresh();
      this.controller = new ViewController(this.$store);
      this.controller.addDocumentClickListener();
    },
    computed: {
      ...mapState(['currentPath', 'fileList', 'basePath', 'temps', 'reverse', 'predicate']),
      sortedList() {
        return this.controller ? this.controller.sortedList() : [];
      }
    },
    methods: {
      ...mapActions([
        'loadData', 'setCurrentPath', 'refresh', 'addToTemps', 'removeFromTemps', 'setTemps', 'setReverse',
        'setPredicate', 'setPredicateAtIndex'
      ]),

    }
  };
</script>


<style>
</style>