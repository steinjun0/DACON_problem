<template>
  <v-card>
    <v-container>
      <v-card-title class="headline"> 세부주소 찾기 </v-card-title>
      <v-card-text
        >우편번호 [{{ postalCode }}] 의 세부주소를 선택해주세요.</v-card-text
      >
      <v-text-field
        label="도로명 주소를 입력해 보세요"
        lazy-validation
        v-model="roadName"
      >
      </v-text-field>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in postItems" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('closeAddressModal')">
          취소
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="
            $emit('closeAddressModal');
            sendAddressInfo();
          "
          :disabled="selectedItem === undefined"
        >
          확인
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    // modal창의 show 여부는 modal componenet 외부에 의존하므로
    // props를 통해 전달 받는다.
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    return {
      selectedItem: 0,
      roadName: "",
    };
  },

  methods: {
    // 선택한 세부주소를 addressModal.js(vuex)로 전달하여
    // 관리할 수 있는 데이터로 사용한다.
    // ** emit을 사용할 시: signup에서 데이터를 관리해야 하며, 이 과정은 간접적이므로
    //                     데이터 관리가 힘들어진다.
    sendAddressInfo: function () {
      this.$store.dispatch(
        "addressModal/getDetailAddress",
        this.postItems[this.selectedItem]
      );
    },
  },
  computed: {
    // computed로 데이터를 확인하고, 동일한 postItem일 경우 cache된 데이터를 사용할 수 있다.
    postItems: function () {
      console.log("it does work");
      return this.$store.state.addressModal.postItems;
    },
    // 코드 가독성을 높이기 위해 computed를 사용
    postalCode: function () {
      return this.$store.state.addressModal.postalCode;
    },
  },
  watch: {
    // ** 입력에 따른 DB검색 작업을 상정하고 코드를 작성
    // 입력되는 roadname이 변경될 때 마다, addressModal에 새로이 신호와 roadname을 보낸다.
    roadName: function () {
      this.$store.dispatch("addressModal/getRoadName", this.roadName);
    },
  },
};
</script>

<style></style>
