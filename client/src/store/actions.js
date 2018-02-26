import fileService from '@/services/fileService';
import Item from './item';
import viewActions from './viewActions';

import {
  checkServerIdentity
} from 'tls';
export default {
  ...viewActions,
  list(c, cb) {
    fileService.list(c.state.currentPath).then(res => {
      var files = res.data.files;
      cb(files);
    });
  },
  refresh(c) {
    if (!c.state.currentPath.length) {
      c.commit('currentPath', c.getters.basePath);
    }

    // c.dispatch('loadData', c.state.currentPath);
    c.dispatch('list', function(files) {
      c.commit('fileList', files);
      // console.log('c.state.currentPath', c.state.currentPath);
      var path = c.state.currentPath.join('/');
      c.dispatch('buildTree', path);
    });
  },
  folderClick(c, item) {
    console.log('item', item);
    c.commit('currentPath', []);
    if (item) {
      c.commit('currentPath', item.model.full_path.split('/').splice(1));
    }
    c.dispatch('refresh');
  },
  goTo(c, index) {
    // console.log('goTo', index);
    c.commit('currentPath', c.state.currentPath.slice(0, index + 1));
    c.dispatch('refresh');
  },
  addToTemps(c, item) {
    c.commit('addToTemps', item);
  },
  removeFromTemps(c, item) {
    c.commit('removeFromTemps', item);
  },
  buildTree(c, p) {
    console.log('p', p);
    var history = c.state.history;
    var fileList = c.state.fileList;
    var basePath = c.state.basePath;

    var recursive = function(parent, item, path) {
      // console.log('parent.name', parent.name);
      var absName = path ? (path + '/' + item.model.name) : item.model.name;
      // console.log('absName', absName);
      if (parent.name.trim() && path.trim().indexOf(parent.name) !== 0) {
        parent.nodes = [];
      }
      // console.log('parent.name', parent.name);
      // console.log('path', path);
      if (parent.name !== path) {
        for (var i in parent.nodes) {
          recursive(parent.nodes[i], item, path);
        }
      } else {
        // console.log('parent.nodes', parent.nodes);
        for (var e in parent.nodes) {
          if (parent.nodes[e].name === absName) {
            return;
          }
        }
        parent.nodes.push({
          item: item,
          name: absName,
          nodes: []
        });
      }
    };

    !history.length && history.push({
      name: p,
      nodes: []
    });
    for (var o in fileList) {
      var item = fileList[o];
      item.model.type === 'dir' && recursive(history[0], item, p);
    }
    c.commit('history', history);
  },
  setPredicateAtIndex(c, options) {
    c.commit('setPredicateAtIndex', options);
  },
  toggleView(c) {
    var current = c.state.view;
    if (current === 'table') {
      c.commit('view', 'icon');
    } else {
      c.commit('view', 'table');
    }
  }
};