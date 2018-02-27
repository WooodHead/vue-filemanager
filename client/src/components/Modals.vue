<template>
  <div>
          <b-modal id="newfolder"
                   title="New Folder"
                   @shown="focusNewFolder"
                   no-fade>
          <form>
              <b-form-group label="Folder name" label-for="folder-name-input">
                  <b-form-input ref="newfolder" id="folder-name-input"></b-form-input>
              </b-form-group>
         </form>
       </b-modal>

       <b-modal id="uploadfile"
       title="Upload File"
       no-fade
       @ok="uploadFiles"
       >
       <template class="btn" slot="modal-cancel">Cancel</template>
<template class="btn" slot="modal-ok">Upload</template>
<form>

  <label class="btn btn-default btn-block">
                Select Files 
    <input type="file" hidden multiple="multiple" @change="filesChange($event)" >
            </label>

  <div class="upload-list">
    <ul class="list-group">
      <li class="list-group-item" v-for="(uploadFile, index) in files">
        <button class="btn btn-sm btn-danger pull-right" ng-click="$parent.removeFromUpload(index)">
                        &times;
                    </button>
        <h5 class="list-group-item-heading">{{uploadFile.name}}</h5>
        <p class="list-group-item-text">{{uploadFile.size }}</p>
      </li>
    </ul>
    <div>
      <em v-show="progress">uploading...{{progress}}%</em>
      <div class="progress mb0">
        <div class="progress-bar active" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100" :style="'width:'+progress+'%'"></div>
      </div>

    </div>
  </div>
</form>
</b-modal>

<b-modal id="move" title="Move" @shown="" no-fade>
  <form>
    <b-form-group label="Folder name" label-for="folder-name-input">
      <b-form-input ref="move" id="folder-name-input"></b-form-input>
      <div>123123</div>
      <div>{{getSelectedPath}}</div>
    </b-form-group>
  </form>

  <div class="panel panel-primary mt10 mb0">
    <div class="panel-body">
      <div class="detail-sources">
        <!-- <div class="like-code mr5"><b>{{"selection" | translate}}:</b> -->
        <span ng-include="'selected-files-msg'"></span>
      </div>
    </div>
    <div class="detail-sources">
      <div class="like-code mr5">
        <!-- <b>{{"destination" | translate}}:</b> {{ getSelectedPath() }} -->
      </div>
      <!-- <a href="" class="label label-primary" ng-click="openNavigator(fileNavigator.currentPath)"> -->
      <!-- {{'change' | translate}} -->
      <!-- </a> -->
    </div>
  </div>


</b-modal>

</div>

</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import axios from 'axios';
  import ViewController from '@/controllers/ViewController';

  export default {
    components: {},
    data() {
      return {
        file: null,
        files: [],
        progress: 0,
        controller: null
      };
    },
    mounted() {
      this.controller = new ViewController(this.$store);
    },
    computed: {
      ...mapGetters(['currentPath', 'fileList', 'basePath']),
      getSelectedPath() {
        var path = this.currentPath.filter(Boolean);
        var result = '/' + path.join('/');
        if (this.controller && this.controller.singleSelection() && !this.controller.singleSelection().model.type === 'dir') {
          result += '/' + this.controller.singleSelection().tempModel.name;
        }
        return result.replace(/\/\//, '/');
      }

    },
    methods: {
      ...mapActions(['loadData', 'setCurrentPath']),
      focusNewFolder(e) {
        this.$refs.newfolder.focus();
      },
      filesChange(e) {
        console.log('e', e);
        var input = e.target;
        this.files = input.files;
        console.log('this.files', this.files);
      },
      uploadFiles(e) {
        e.preventDefault();
        console.log('e', e);
        console.log('this.files', this.files);
        var data = this.files;
        const formData = new FormData();
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          formData.append('uploadfile', data[i], data[i].name);
        }
        console.log('formData', formData);

        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();

        // axios.get('/api/upload/cancel', {
        //   cancelToken: source.token
        // }).catch(function(thrown) {
        //   if (axios.isCancel(thrown)) {
        //     console.log('Request canceled', thrown.message);
        //   } else {
        //     // handle error
        //   }
        // });

        // cancel the request (the message parameter is optional)
        // source.cancel('Operation canceled by the user.');

        axios({
          method: 'POST',
          url: '/api/upload',
          header: {
            'content-type': 'multipart/form-data',
          },
          cancelToken: source.token,
          data: formData,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              this.progress = percentCompleted;
              this.inprocess = true;
              if (percentCompleted === 100) {
                this.uploadFinished = true;
                this.files = [];
              }
            }

          }
        }).then((res) => {
          res = res.data;
          if (res.success) {

            this.imgArr = res.data;
            console.log(this.imgArr);
          }
        });

      }
    },

  };
</script>


<style>
</style>