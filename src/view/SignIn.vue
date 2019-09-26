<template>
  <div class="UserCreation-Container">
    <h2 class="UserCreate-Header">User Sign In Form</h2>
    <el-form ref="userCreateForm" :model="users" label-width="180px">
      <el-form-item
        label="Name"
        prop="name"
        :rules="[{ required: true, message: 'Name is required.' }]"
      >
        <el-input v-model="users.name"></el-input>
      </el-form-item>
      <el-form-item
        label="Email Address"
        prop="email"
        :rules="
                [{   
                    required: true, 
                    message: 'Email is required.',
                    trigger: 'blur'
                },
                {
                    type: 'email',
                    message: 'Please Correct Email Format....',
                    trigger: 'blur'
                },
                {
                    pattern: /^[ A-Za-z0-9-./@_]*$/,
                    message: 'Email Format Wrong....',
                    trigger: 'blur'
                }]"
      >
        <el-input v-model="users.email" type="email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
        :rules="
        [
        {
            required: true,
            message: 'Password is required.',
            trigger: 'blur'
        },
        {
            pattern: /^[ A-Za-z0-9!#$%&()*+,-./<=>?@[\]^_{|}~]*$/,
            message: 'Wrong Password Format....',
            trigger: 'blur'
        }]"
      >
        <el-input v-model="users.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="Confirm password">
        <el-input v-model="users.confirmPassword" type="password" autocomplete="off"></el-input>
        <div
          class="el-form-item__error"
          v-if="ConfirmErrMsgShow"
        >Confirm Password must be same with password...</div>
      </el-form-item>
      <el-form-item label="Type">
        <el-select v-model="userType" placeholder="Choose User Type">
          <el-option value="Admin">Admin</el-option>
          <el-option value="User">User</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Phone">
        <el-input v-model="users.phone"></el-input>
      </el-form-item>
      <el-form-item label="Date Of Birth">
        <el-input v-model="users.dob" placeholder="DD/MM/YY"></el-input>
      </el-form-item>
      <el-form-item label="Address">
        <el-input v-model="users.address" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Profile">
        <el-upload
          action="null"
          class="imageUpload"
          :on-change="UploadImage"
          :auto-upload="false"
          :multiple="false"
          accept=".png, .jpg, .jpeg"
        >
          <el-button size="small" type="primary" class="image-upload">Click to upload</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="cancelPost">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { router } from "../router";

export default {
  data() {
    return {
      passwordConfirmErrorShow: false,
      ConfirmErrMsgShow: false,
      userType: null
    };
  },
  created() {
    this.resetState();
  },
  computed: {
    ...mapGetters("user", { users: "user" })
  },
  methods: {
    ...mapActions("user", ["userCreation", "resetState"]),
    onSubmit() {
      this.$refs["userCreateForm"].validate(valid => {
        this.ConfirmErrMsgShow =
          this.users.password != this.users.confirmPassword;
        if (valid && !this.ConfirmErrMsgShow) {
          this.users.type = this.userType == "Admin" ? "0" : "1";
          this.userCreation();
        }
      });
    },
    cancelPost() {
      this.resetState();
    },
    UploadImage(e) {
      var reader = new FileReader();
      reader.onload = e => {
        this.users.profile = e.target.result;
      };
      reader.readAsDataURL(e.raw);
    }
  }
};
</script>
<style>
.UserCreation-Container {
  position: absolute;
  width: 50vw;
  margin: auto;
  right: 0;
  left: 0;
}
.UserCreate-Header {
  text-align: center;
  color: #606266;
  margin-left: 5rem;
}
.UserCreation-Container .el-form-item__label {
  font-size: 18px !important;
}
</style>