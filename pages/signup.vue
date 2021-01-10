<template>
  <v-container>
    <v-form v-model="signupValid">
      <v-list>
        <v-list-item>
          <v-text-field
            label="ID를 입력하세요"
            :rules="[(v) => !!v || '내용을 입력하세요.']"
            lazy-validation
            v-model="user.id"
          >
          </v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field
            label="Nickname을 입력하세요"
            :rules="[(v) => !!v || '내용을 입력하세요.']"
            lazy-validation
            v-model="user.nickname"
          >
          </v-text-field>
        </v-list-item>
        <v-list-item>
          <v-form class="postalForm" lazy-validation v-model="postalValid">
            <v-text-field
              label="우편번호를 입력하세요"
              :rules="[
                (v) => isNaN(Number(v)) !== true || '숫자를 입력하세요!',
                (v) => !!v || '내용을 입력하세요.',
              ]"
              lazy-validation
              v-model="user.postalCode"
            >
            </v-text-field>
            <v-dialog v-model="showAddressModal" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :disabled="!postalValid"
                  :dark="postalValid"
                  style="margin-left: 1rem"
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  세부주소 찾기
                </v-btn>
              </template>
              <address-modal
                :showModal="showAddressModal"
                :postalCode="Number(user.postalCode)"
                @closeAddressModal="showAddressModal = false"
              ></address-modal>
            </v-dialog>
          </v-form>
        </v-list-item>
        <v-list-item class="postListItem">
          <v-subheader class="subheader"> 세부주소 </v-subheader>
          <v-textarea
            readonly
            :value="detailAddress"
            no-resize
            rows="1"
            style="width: 100%; padding-top: 0"
          ></v-textarea>
        </v-list-item>
        <v-list-item
          ><v-text-field
            label="비밀번호를 입력하세요"
            type="password"
            :rules="[(v) => !!v || '내용을 입력하세요.']"
            lazy-validation
            v-model="user.password"
          >
          </v-text-field
        ></v-list-item>
        <v-list-item
          ><v-text-field
            label="비밀번호를 한 번 더 입력하세요"
            type="password"
            :rules="[
              (v) => !!v || '내용을 입력하세요.',
              (v) => v === user.password || '비밀번호가 다릅니다!',
            ]"
            lazy-validation
          >
          </v-text-field
        ></v-list-item>
        <v-list-item
          ><v-btn
            :disabled="!signupValid || !postalValid || detailAddress === ''"
            :dark="signupValid && postalValid && detailAddress !== ''"
            @click="sendUserInfo"
            color="success"
          >
            가입하기
          </v-btn></v-list-item
        >
      </v-list>
    </v-form>
  </v-container>
</template>

<script>
import addressModal from "~/components/addressModal.vue";
export default {
  components: {
    addressModal,
  },
  data: function () {
    return {
      user: {
        id: "",
        nickname: "",
        postalCode: "",
        address: "",
        password: "",
      },
      showAddressModal: false, // modal 창을 컨트롤 하는 변수
      signupValid: false,
      postalValid: false, // postalCode text-field의 rule에 따라 버튼 입력을 제한
    };
  },
  mounted: function () {
    this.postalValid = false;
    this.signupValid = false;
    // 페이지가 처음 로드될 때 validate의 값이 true를 반환하기 때문에
    // text-field가 비었을 때 확인 버튼 입력을 제한하기 위해 추가
  },
  methods: {
    sendUserInfo: function () {
      this.$store.dispatch("signup/getUserInfo", this.user);
    },
  },
  computed: {
    detailAddress: function () {
      return this.$store.state.addressModal.detailAddress;
    },
  },
};
</script>

<style>
.postListItem {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 3.5rem;
}

.subheader {
  padding: 0;
  height: auto;
  font-size: 0.5rem;
}

.postalForm {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
