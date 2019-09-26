<template>
  <div class="UserEdition-Container">
    <h2 class="UserEdit-Header">User Update Form</h2>
    <el-form ref="userUpdateForm" :model="user" label-width="150px">
      <el-form-item
        label="Name"
        prop="name"
        :rules="[{ required: true, message: 'Name is required.' }]"
      >
        <el-input v-model="user.name"></el-input>
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
        <el-input v-model="user.email" type="email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Type">
        <el-select v-model="user.type" placeholder="Choose User Type">
          <el-option value="Admin">Admin</el-option>
          <el-option value="User">User</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Phone">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="Date Of Birth">
        <el-input v-model="user.dob" placeholder="DD/MM/YY"></el-input>
      </el-form-item>
      <el-form-item label="Address">
        <el-input v-model="user.address" type="textarea"></el-input>
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
          <el-button size="small" type="primary" class="image-upload">Change Profile</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="PasswordChange()">Change Password</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="UpdateUser()">Update</el-button>
        <el-button @click="cancelUser">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { router } from "../router";
import { log } from "util";

export default {
  data() {
    return {};
  },
  created() {
    this.resetState();
    this.fetchData(this.$route.params.id);
  },
  watch: {
    "$route.params.id": function() {
      this.fetchData(this.$route.params.id);
    }
  },
  computed: {
    ...mapGetters("user", { user: "user" })
  },
  methods: {
    ...mapActions("user", ["updateUser", "resetState", "fetchData"]),
    UpdateUser() {
      this.$refs["userUpdateForm"].validate(valid => {
        if (valid) {
          this.user.type = this.user.type == "Admin" ? "0" : "1";
          this.updateUser();
          router.push("/user/userlist");
        }
      });
    },
    cancelUser() {
      this.resetState();
    },
    UploadImage(e) {
      var reader = new FileReader();
      reader.onload = e => {
        this.user.profile = e.target.result;
      };
      reader.readAsDataURL(e.raw);
    },
    PasswordChange() {
      router.push("/user/changepassword");
    },
    getUserType(type) {
      return type;
    }
  }
};
</script>
<style>
.UserEdition-Container {
  position: absolute;
  width: 50vw;
  margin: auto;
  right: 0;
  left: 0;
}
.UserEdit-Header {
  text-align: center;
  color: #606266;
  margin-left: 5rem;
}
.UserEdition-Container .el-form-item__label {
  font-size: 18px !important;
}
</style>