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
    // console.log(state.postItems);
  },
  setBackupPostItems: function (state, payload) {
    state.backupPostItems = state.postItems.slice(); // 깊은 복사를 통해 백업 파일을 생성
  },
  setDetailAddress: function (state, payload) {
    state.detailAddress = payload;
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
      ]; // 더미 데이터
      // 얻은 데이터를 mutation->state로 저장
      commit("setPostItems", postItems);

      // roadName 검색 기능을 더미 데이터를 백업함(추후 검색 기능 구현에 따라 삭제)
      commit("setBackupPostItems", postItems);
    }, 1000);
  },
  getDetailAddress: function ({ commit }, detailAddress) {
    commit("setDetailAddress", detailAddress);
  },
  // watch를 통해 입력받은 roadname을 기존 postItems를 변경
  // ** DB검색 상황을 상정했음을 다시 짚고 넘어간다.
  // ** 입력값이 연속적으로 등장하는 동작을 하나, 서버가 있다면
  //    반환값을 조절하여 동작을 조절할 수 있다.
  // ***  본 문제를 setTimeout을 통해 addressModal.vue에서 처리하려 했으나
  //      computed가 반응하지 않는 현상이 발생함.
  getRoadName: function ({ commit, state }, roadName) {
    var postItems = [String(roadName) + "로 검색중"];
    commit("setPostItems", postItems);
    setTimeout(() => {
      for (var i = 0; i < state.backupPostItems.length; i++) {
        postItems[i] = roadName + " " + state.backupPostItems[i];
      }
      console.log("finish find");
      commit("setPostItems", postItems);
    }, 2000);
  },
};
