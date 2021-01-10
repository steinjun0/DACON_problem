export const state = () => ({
  user: {
    id: "",
    nickname: "",
    postalCode: "",
    address: "",
    password: "",
  },
});

export const mutations = {
  setUserInfo: function (state, payload) {
    state.user = payload;
  },
};

export const actions = {
  getUserInfo: function ({ commit }, userInfo) {
    commit("setUserInfo", userInfo);
  },
};
