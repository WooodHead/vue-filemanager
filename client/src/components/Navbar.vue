<template>

  <nav class="navbar navbar-inverse fixed-top|fixed-bottom|sticky-top">

    <breadcrumb></breadcrumb>

    <form class="ml-auto form-inline my-2 my-lg-0">
            <div class="form-group has-feedback has-clear">
                <input 
                v-model="queryText"
                v-show="searching" 
                @blur="searchBlur($event)"
                id="searchinput"
                type="search" 
                ref="search"
                class="form-control" 
                placeholder="Filter file">
                <i v-show="searching"
                @click="clearSearch"
                class="fa fa-remove form-control-clear form-control-feedback"></i>
              </div>
        
          </div>
      <!-- <input v-model="query" v-show="searching" ref="search" id="search-input" type="text" @blur="searchBlur()" autofocus> -->
      <button class="btn btn-flat btn-sm" ref="searchButton" @click="searchClick()">
        <i class="fa fa-search"></i>
      </button>

      <button class="btn btn-flat btn-sm" @click="toggleView" ng-show="$parent.viewTemplate !=='main-icons.html'" title="icons">
        <i class="fa fa-th-large" v-if="view==='table'"></i>
        <i class="fa fa-list" v-if="view==='icon'"></i>
      </button>

      <button class="btn btn-flat btn-sm" ng-show="$parent.viewTemplate !=='main-icons.html'" title="icons">
        <i class="fa fa-globe"></i>
      </button>

      <b-dropdown class="" variant="link" no-caret right>
          <div class="" slot="button-content">
            <i class="fa fa-ellipsis-v"></i>
          </div>
          <b-dropdown-item v-b-modal.newfolder href="#" @click="modal('newfolder')">
            <i class="fa fa-plus"></i>
            New folder
          </b-dropdown-item>
          <b-dropdown-item v-b-modal.uploadfile href="#">
            <i class="fa fa-cloud-upload"></i>
            Upload file
          </b-dropdown-item>
       </b-dropdown>

</form>

</nav>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb';
  import fileService from '@/services/fileService';
  import config from '@/config';
  import {
    mapGetters
  } from 'vuex';
  import {
    mapActions
  } from 'vuex';

  export default {
    components: {
      Breadcrumb
    },
    data() {
      return {
        searching: false
      };
    },
    computed: {
      ...mapGetters(['currentPath', 'fileList', 'basePath', 'view', 'query']),
      queryText: {
        get() {
          return this.query;
        },
        set(value) {
          this.setQuery(value);
        }
      }
    },
    methods: {
      ...mapActions([
        'loadData', 'setCurrentPath', 'toggleView', 'setQuery'
      ]),
      clearSearch() {
        this.setQuery('');
        this.$nextTick(() => this.$refs.search.focus());
      },
      searchClick() {
        this.searching = true;
        this.$nextTick(() => this.$refs.search.focus());
      },
      searchBlur(e) {
        var searchButton = this.$refs.searchButton;
        if (!this.query && e.relatedTarget !== searchButton) {
          this.searching = false;
        }
      },
      modal(id, hide, returnElement) {
        console.log('id', id);
        var modal = document.getElementById('#' + id);
        // var element = angular.element('#' + id);
        // element.modal(hide ? 'hide' : 'show');
        // $scope.apiMiddleware.apiHandler.error = '';
        // $scope.apiMiddleware.apiHandler.asyncSuccess = false;
        // return returnElement ? element : true;
      }
    }
  };
</script>

<style>
  .navbar-inverse {
    background-color: #2196f3;
  }


  .dropdown .btn {
    box-shadow: none;
    color: #FFF;
  }

  .dropdown {
    margin-left: 5px;
  }

  .dropdown-item .fa {
    margin-right: 0.5em;
  }
</style>