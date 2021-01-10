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
    showModal: {
      type: Boolean,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      selectedItem: 1,
      roadName: "",
    };
  },

  methods: {
    closeAddressModal: function () {
      this.$store.dispatch("addressModal/closeModal");
    },

    sendAddressInfo: function () {
      console.log("im here!");
      this.$store.dispatch(
        "addressModal/getDetailAddress",
        this.postItems[this.selectedItem]
      );
    },
  },
  computed: {
    postItems: function () {
      return this.$store.state.addressModal.postItems;
    },
  },
  watch: {
    roadName: function () {
      this.$store.dispatch("addressModal/getRoadName", this.roadName);
    },
  },
};
</script>

<style></style>
