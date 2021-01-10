export const state = () => ({
  detailAddress: "",
  showModal: false,
  postItems: [],
  backupPostItems: [],
});

export const mutations = {
  setDetailAddress: function (state, payload) {
    state.detailAddress = payload;
  },
  showModal: function (state, payload) {
    state.showModal = payload;
  },
  closeModal: function (state) {
    state.showModal = false;
  },
  setPostItems: function (state, payload) {
    state.postItems = payload;
    state.backupPostItems = state.postItems.slice();
  },
  setDetailAddress: function (state, payload) {
    state.detailAddress = payload;
  },
  addRoadName: function (state, payload) {
    for (var i = 0; i < state.postItems.length; i++) {
      state.postItems[i] = payload + " " + state.backupPostItems[i];
    }
  },
};

export const actions = {
  openModal({ commit }) {
    commit("openModal", true);
  },
  closeModal({ commit }) {
    commit("closeModal", false);
  },
  findPostItems: function ({ commit }, postalCode) {
    var postItems = [
      "가상의 집주소1",
      "가상의 집주소2",
      "가상의 집주소3",
      "PC: " + String(postalCode),
    ];
    commit("setPostItems", postItems);
  },
  getDetailAddress: function ({ commit }, detailAddress) {
    commit("setDetailAddress", detailAddress);
  },
  getRoadName: function ({ commit }, roadName) {
    commit("addRoadName", roadName);
  },
};
