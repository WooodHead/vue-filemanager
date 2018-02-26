function upperCaseHead(word) {
  if (word) {
    return word[0].toUpperCase() + word.slice(1, word.length);
  }
  return word;
}
export default function mapper(module) {
  if (module.getters === undefined) {
    module.getters = {};
  }

  if (module.mutations === undefined) {
    module.mutations = {};
  }

  Object.keys(module.state).forEach(key => {
    if (module.getters[key] === undefined) {
      module.getters[key] = state => state[key];
    }
    if (module.mutations[key] === undefined) {
      module.mutations[key] = (state, value) => {
        state[key] = value;
      };
    }
    var actionKey = 'set' + upperCaseHead(key);
    if (module.actions[actionKey] === undefined) {
      module.actions[actionKey] = (c, value) => {
        c.commit(key, value);
      };
    }
  });

  return module;
}
