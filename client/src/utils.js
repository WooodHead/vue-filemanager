import filesize from 'filesize';

export default {
  install: function(Vue, options) {
    Object.defineProperty(Vue.prototype, '$filesize', {
      value: filesize
    });

    var allGetters = Object.keys(options.store.getters);
    var allActions = Object.keys(options.store._actions);

    Object.defineProperty(Vue.prototype, '$allGetters', {
      value: allGetters
    });

    Object.defineProperty(Vue.prototype, '$allActions', {
      value: allActions
    });

  }
};