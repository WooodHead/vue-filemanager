import Vue from 'vue';

export default {
  addToTemps(state, item) {
    state.temps.push(item);
  },

  removeFromTemps(state, item) {
    var index = state.temps.indexOf(item);
    if (index !== -1) {
      state.temps.splice(index, 1);
    }
  },
  setPredicateAtIndex(state, option) {
    state.predicate.splice(option.index, 1, option.item);
  }
};
