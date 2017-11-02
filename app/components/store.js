let state = {};

var store = {};

store.put = function (key, value) {
  state[key] = value;
  console.log(state);
}

store.get = function (key) {
  return state[key];
}

module.exports = store;
