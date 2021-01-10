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
    state.user.id = payload.id;
    state.user.nickname = payload.nickname;
    state.user.postalCode = payload.postalCode;
    state.user.address = payload.address;
    state.user.password = payload.password;
  },
};

export const actions = {
  getUserInfo: function ({ commit }, userInfo) {
    commit("setUserInfo", userInfo);
  },
};
