import filesize from 'filesize';

export default {
  install: function (Vue, options) {
    Object.defineProperty(Vue.prototype, '$filesize', {
      value: filesize
    });

    console.log('options.store', options.store);
    var allGetters = Object.keys(options.store.getters);
    var allActions = Object.keys(options.store._actions);
    console.log('allGetters', allGetters);
    console.log('allActions', allActions);
    Object.defineProperty(Vue.prototype, '$allGetters', {
      value: allGetters
    });

    Object.defineProperty(Vue.prototype, '$allActions', {
      value: allActions
    });

  }
};
