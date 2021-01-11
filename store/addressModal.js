export const state = () => ({
  detailAddress: "",
  postItems: [],
  backupPostItems: [],
  postalCode: "",
});

export const mutations = {
  setDetailAddress: function (state, payload) {
    state.detailAddress = payload;
  },
  setPostalCode: function (state, payload) {
    state.postalCode = payload;
  },
  setPostItems: function (state, payload) {
    state.postItems = payload;
  },
  setBackupPostItems: function (state, payload) {
    state.backupPostItems = state.postItems.slice(); // 깊은 복사를 통해 백업 파일을 생성
  },
  setDetailAddress: function (state, payload) {
    state.detailAddress = payload;
  },
  addRoadName: function (state, payload) {
    for (var i = 0; i < state.backupPostItems.length; i++) {
      state.postItems[i] = payload + " " + state.backupPostItems[i];
    }
  },
};

export const actions = {
  findPostItems: function ({ commit }, postalCode) {
    // 본 위치에서 DB로 부터 postItem을 찾는다.(비동기)
    // DB가 없으므로 더미 데이터를 사용함.
    commit("setPostalCode", postalCode);
    var postItems = [String(postalCode) + "로 검색중"];
    commit("setPostItems", postItems);
    setTimeout(() => {
      postItems = [
        String(postalCode) + "의 주소1",
        String(postalCode) + "의 주소2",
        String(postalCode) + "의 주소3",
        "PC: " + String(postalCode),
      ];
      commit("setPostItems", postItems);
      commit("setBackupPostItems", postItems);
    }, 1000);
  },
  getDetailAddress: function ({ commit }, detailAddress) {
    commit("setDetailAddress", detailAddress);
  },
  // watch를 통해 입력받은 roadname을 기존 postItems를 변경
  // ** DB검색 상황을 상정했음을 다시 짚고 넘어간다.
  // ** 입력값이 연속적으로 등장하는 동작을 하나, 서버가 있다면
  //    반환값을 조절하여 방지할 수 있다.
  getRoadName: function ({ commit, state }, roadName) {
    var postItems = [String(roadName) + "로 검색중"];
    commit("setPostItems", postItems);
    setTimeout(() => {
      for (var i = 0; i < state.backupPostItems.length; i++) {
        postItems[i] = roadName + " " + state.backupPostItems[i];
      }
      commit("setPostItems", postItems);
    }, 3000);
  },
};
