<template>
  <div>
    <table class="table mb0 table-files noselect">
      <thead>
        <tr>
          <th>
            <a href="javascript:void(0)" @click="order('name')">
              <!-- {{"name" | translate}} -->
              name
              <span class="sortorder" v-if="predicate[1] === 'name'" :class="{reverse:reverse}"></span>
            </a>
          </th>
          <th class="hidden-xs" ng-hide="config.hideSize">
            <a href="javascript:void(0)" @click="order('size')">
              <!-- {{"size" | translate}} -->
              size
              <span class="sortorder" v-if="predicate[1] === 'size'" :class="{reverse:reverse}"></span>
            </a>
          </th>
          <th class="hidden-sm hidden-xs" ng-hide="config.hideDate">
            <a href="javascript:void(0)" @click="order('date')">
              <!-- {{"date" | translate}} -->
              date
              <span class="sortorder" v-if="predicate[1] === 'date'" :class="{reverse:reverse}"></span>
            </a>
          </th>
          <th class="hidden-sm hidden-xs" ng-hide="config.hidePermissions">
            <a href="javascript:void(0)" @click="order('permissions')">
              <!-- {{"permissions" | translate}} -->
              permissions
              <span class="sortorder" v-if="predicate[1] === 'permissions'" :class="{reverse:reverse}"></span>
            </a>
          </th>
        </tr>
      </thead>
      <tbody class="file-item">
        <tr ng-show="fileNavigator.requesting">
          <td colspan="5">
            <div ng-include="config.tplPath + '/spinner.html'"></div>
          </td>
        </tr>
        <tr v-if="sortedList.length<1">
          <td colspan="5">
            no_files_in_folder
          </td>
        </tr>
        <!-- <tr v-if="false"> -->
        <!-- <td colspan="5"> -->
        <!-- {{ fileNavigator.error }} -->
        <!-- </td> -->
        <!-- </tr> -->
        <tr class="item-list" v-for="item in sortedList" :class="{selected:controller&&controller.isSelected(item)}" @dblclick="controller.smartClick(item)" @click="controller.selectOrUnselect(item, $event)"
          ng-right-click="controller.selectOrUnselect(item, $event)" @contextmenu="controller.contextMenuHanclder($event,item)">
          <td>
            <a href="javascript:void(0);">
              <i v-if="item.model.type==='dir'" class="fa fa-folder"></i>
              <i v-if="item.model.type==='file'" class="fa fa-file-o" aria-hidden="true"></i>
              {{item.model.name}}
            </a>
          </td>
          <td class="hidden-xs ">
            <span v-if="item.model.type!=='dir'">
              {{item.model.size}}
            </span>
          </td>
          <td class="hidden-sm hidden-xs ">
            {{item.model.date | moment('YYYY-MM-DD hh:mm:ss')}}
          </td>
          <td class="hidden-sm hidden-xs " ng-hide="config.hidePermissions ">
            <!-- {{item.model.perms.toCode(item.model.type === 'dir'?'d':'-')}} -->
            aaa
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
  import fileService from '@/services/fileService';
  import config from '@/config';
  import ViewController from '@/controllers/ViewController';

  import {
    mapGetters,
    mapState,
    mapActions
  } from 'vuex';

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
      order(predicate) {
        var reverse = (this.predicate[1] === predicate) ? !this.reverse : false;
        this.setReverse(reverse);
        this.setPredicateAtIndex({
          index: 1,
          item: predicate
        });
      },

    }
  };
</script>


<style>
  th {
    min-width: 95px;
  }
</style>