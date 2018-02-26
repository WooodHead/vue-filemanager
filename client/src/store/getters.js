export default {
  basePath(state) {
    var path = (state.basePath || '').replace(/^\//, '');
    return path.trim() ? path.split('/') : [];
  },
  isSelected(state) {
    // return this.temps.indexOf(item) !== -1;
    return function (item) {
      return state.temps.indexOf(item) !== -1;
    };
  },
};
