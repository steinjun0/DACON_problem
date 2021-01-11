<template>
  <v-container>
    <v-form ref="signupForm" v-model="signupValid">
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
                  @click="findPostItems(Number(user.postalCode))"
                >
                  세부주소 찾기
                </v-btn>
              </template>
              <address-modal
                :showModal="showAddressModal"
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
              () => passwordCheckValid || '비밀번호가 다릅니다!',
            ]"
            v-model="passwordCheck"
          >
          </v-text-field
        ></v-list-item>
        <v-list-item
          ><v-btn
            :disabled="!signupValid || !postalValid || detailAddress === ''"
            :dark="signupValid && postalValid && detailAddress !== ''"
            @click="checkValidation"
            color="success"
          >
            가입하기
          </v-btn></v-list-item
        >
      </v-list>
    </v-form>
    <v-textarea
      v-if="!!this.$store.state.signup.user.id"
      value="userInformation이 signup.js로 전달되었습니다."
      readonly
      rows="1"
    ></v-textarea>
    <v-textarea
      v-if="!!this.$store.state.signup.user.id"
      :value="
        'id: ' +
        this.$store.state.signup.user.id +
        '\nnickname: ' +
        this.$store.state.signup.user.nickname +
        '\npostalCode: ' +
        this.$store.state.signup.user.postalCode +
        '\naddress: ' +
        this.$store.state.signup.user.address +
        '\npassword: ' +
        this.$store.state.signup.user.password
      "
      readonly
    ></v-textarea>
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
      // 현재 영역에서 선언된 user는 화면에 보여주기 위한 값이며
      // 실제로 데이터의 관리/사용은 signup.js에서 관리한다.
      user: {
        id: "",
        nickname: "",
        postalCode: "",
        address: "",
        password: "",
      },
      passwordCheck: "",
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
    // 입력받은 우편번호를 통해 세부 주소 목록을 로딩
    // 세부주소 찾기 click event에 의존
    // addressModal에 한해, 우편번호는 세부주소를 찾을 때만 사용되고
    // 세부주소는 우편번호가 필수적이다.
    // 따라서 별도의 sendPostalCode 함수를 작성하지 않고 findPostItems에서 함께 처리한다.
    findPostItems: function (postalCode) {
      this.$store.dispatch("addressModal/findPostItems", postalCode);
    },

    // 모든 validation을 만족하고 버튼이 click될 때, 데이터를 송신.
    // 제출 click event에 의존
    // ** 현재는 signup.js로 보내지만, 본 작업은 서버로 보내질 수도 있음을 상정하고 작업 **
    sendUserInfo: function () {
      this.$store.dispatch("signup/getUserInfo", this.user);
    },

    // 제출 버튼을 click할 때, form .signupForm 내부의 validation rules를
    // 모두 확인하고, true가 반환될 때, sendUserInfo를 실시한다.
    // validate는 확인과 반환을 모두 시행한다.
    checkValidation: function () {
      if (this.$refs.signupForm.validate()) {
        this.sendUserInfo();
      }
    },
  },
  computed: {
    // 세부주소는 addressModal.js에서 관리한다.
    // 또한 signupPage에서는 화면에 띄우는 작업 외에는 데이터가 필요하지 않으므로
    // computed로 값을 받아온다.
    detailAddress: function () {
      this.user.address = this.$store.state.addressModal.detailAddress;
      return this.$store.state.addressModal.detailAddress;
    },
    // vue.js의 공식문서 첫 번째 예제와 같이, 가독성을 올리기 위해 computed에 배치
    passwordCheckValid: function () {
      return this.user.password === this.passwordCheck;
    },
  },
  watch: {},
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
