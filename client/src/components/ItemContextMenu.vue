<template>
  <div id="context-menu" class="dropdown clearfix animated fast fadeIn">
    <ul class="dropdown-menu dropdown-right-click" role="menu" aria-labelledby="dropdownMenu" ng-show="temps.length">

      <li v-show="controller&&controller&&controller.singleSelection()">
        <a class="dropdown-item" href="javascript:void(0)" tabindex="-1" @click="controller.smartClick(controller.singleSelection())">
          <i class="fa fa-folder-open"></i>
          open
        </a>
      </li>

      <li ng-show="config.pickCallback && singleSelection() && singleSelection().isSelectable()">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="config.pickCallback(singleSelection().model)">
          <i class="fa fa-hand-o-up" aria-hidden="true"></i>
          select_this
        </a>
      </li>

      <li v-show="controller&&!controller.selectionHas('dir') && controller.singleSelection()">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="download()">
          <i class="fa fa-cloud-download"></i>
          download
        </a>
      </li>

      <li v-show="controller&&!controller.selectionHas('dir') && controller.singleSelection()" ng-show="config.allowedActions.downloadMultiple && !selectionHas('dir') && !singleSelection()">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="download()">
          <i class="fa fa-cloud-download"></i> download_as_zip
        </a>
      </li>

      <li ng-show="config.allowedActions.preview && singleSelection().isImage() && singleSelection()">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="openImagePreview()">
          <i class="fa fa-eye"></i> view_item
        </a>
      </li>

      <li ng-show="config.allowedActions.rename && singleSelection()">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="modal('rename')">
          <i class="fa fa-edit"></i> rename
        </a>
      </li>

      <li ng-show="config.allowedActions.move">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="modalWithPathSelector('move')">
          <i class="fa fa-arrow-right"></i> move
        </a>
      </li>

      <li ng-show="config.allowedActions.copy && !selectionHas('dir')">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="modalWithPathSelector('copy')">
          <i class="fa fa-clipboard    "></i> copy
        </a>
      </li>

      <li ng-show="config.allowedActions.edit && singleSelection() && singleSelection().isEditable()">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="openEditItem()">
          <i class="fa fa-pencil"></i> edit
        </a>
      </li>

      <li ng-show="config.allowedActions.changePermissions">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="modal('changepermissions')">
          <i class="fa fa-lock"></i> permissions
        </a>
      </li>

      <li ng-show="config.allowedActions.compress && (!singleSelection() || selectionHas('dir'))">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="modal('compress')">
          <i class="fa fa-file-zip-o" aria-hidden="true"></i>
          compress
        </a>
      </li>

      <li ng-show="config.allowedActions.extract && singleSelection() && singleSelection().isExtractable()">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="modal('extract')">
          <i class="fa fa-arrow-up"></i> extract

        </a>
      </li>

      <li class="divider" ng-show="config.allowedActions.remove"></li>

      <li ng-show="config.allowedActions.remove">
        <a class="dropdown-item" href="" tabindex="-1" ng-click="modal('remove')">
          <i class="fa fa-trash"></i> remove
        </a>
      </li>

    </ul>


  </div>

</template>

<script>
  import ViewController from '@/controllers/ViewController';
  import { mapGetters } from 'vuex';
  import {
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
      this.controller = new ViewController(this.$store);
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