<template>
  <div class="ChangePassword-Container">
    <h2 class="ChangePassword-Header">Change Password</h2>
    <el-form ref="passwordChangeForm" :model="passwordData" label-width="150px">
      <el-form-item
        label="Old Password"
        prop="oldPassword"
        :rules="[{ required: true, message: 'Old Password is required.' }]"
      >
        <el-input v-model="passwordData.oldPassword" type="password"></el-input>
        <div
          class="el-form-item__error"
          v-if="OldPasswordErrMsgShow"
        >Old Password is incorrect...</div>
      </el-form-item>
      <el-form-item
        label="New Password"
        prop="newPassword"
        :rules="[{ required: true, message: 'New Password is required.', trigger: 'blur' }]"
      >
        <el-input v-model="passwordData.newPassword" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="Confirm Password"
        prop="confirmPassword"
        :rules="[{ required: true, message: 'Confirm Password is required.', trigger: 'blur' }]"
      >
        <el-input v-model="passwordData.confirmPassword" type="password" autocomplete="off"></el-input>
        <div
          class="el-form-item__error"
          v-if="ConfirmPwdErrMsgShow"
        >Confirm Password must be same with password...</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="UpdatePassword()">Change</el-button>
        <el-button @click="cancelChanges()">Cancel</el-button>
      </el-form-item>
    </el-form>
    <el-dialog class="PasswordSuccessDialog" :visible.sync="PasswordSuccessDialogShow" width="30%" center>
      <span>Password Change Successfully!</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="successPasswordChange()">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { router } from "../router";

export default {
  data() {
    return {
      tokenUser: {},
      ConfirmPwdErrMsgShow: false,
      OldPasswordErrMsgShow: false,
      PasswordSuccessDialogShow: false
    };
  },
  created() {
    this.tokenUser = JSON.parse(localStorage.getItem("user"));
  },
  computed: {
    ...mapGetters("user", { passwordData: "password" })
  },
  methods: {
    ...mapActions("user", ["updatePassword"]),
    UpdatePassword() {
        this.$refs["passwordChangeForm"].validate(valid => {
        this.ConfirmPwdErrMsgShow = this.passwordData.newPassword != this.passwordData.confirmPassword;
        if (valid && !this.PasswordErrMsgShow) {
          this.updatePassword().then(result => {
            if(result.errors && result.errors.length) {
              this.OldPasswordErrMsgShow = true;
            } else {
              this.OldPasswordErrMsgShow = false;
              this.PasswordSuccessDialogShow = true;
            }
          })                    
        }
      });
    },
    successPasswordChange() {
      this.PasswordSuccessDialogShow = false;
      router.push("/user/update/" + this.tokenUser.id);
    }
  }
};
</script>
<style>
.ChangePassword-Container {
  position: absolute;
  width: 40vw;
  margin: auto;
  right: 0;
  left: 0;
}
.ChangePassword-Header {
  text-align: center;
  color: #606266;
  margin-left: 5rem;
}
.ChangePassword-Container .el-form-item__label {
  font-size: 16px !important;
}
.PasswordSuccessDialog .el-dialog--center .el-dialog__body {
  text-align: center;
  font-size: 18px;
}
</style>