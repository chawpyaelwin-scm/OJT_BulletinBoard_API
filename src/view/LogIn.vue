<template>
     <el-container>
        <el-main>
            <div class="LoginIn-Form">
                <el-form :model="userLoginFilled"  ref="loginForm">
                    <div class="loginLogo-layout">
                        <img class="LoginLogo" src="@/assets/bulletinLogo.png"/>
                        <h1 class="HeaderTitle">SCM Bulletin Board</h1>
                    </div>
                    <el-form-item prop="email" :rules="[{ required: true, message: '*Email address is required' }]">
                        <el-input type="text"  autocomplete="off" placeholder="example@gmail.com" v-model="userLoginFilled.email"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" :rules="[{ required: true, message: '*Password is required' }]">
                        <el-input type="password" autocomplete="off" placeholder="**********" v-model="userLoginFilled.password"></el-input>
                        <div
                        class="el-form-item__error"
                        v-if="loginFailErrShow"
                        >Email or Password Wrong...</div>
                    </el-form-item>
                    <el-form-item class="login-button">
                        <el-button type="primary" @click="loginUser(userLoginFilled)">Login</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { router } from "../router";

export default {
    data() {
        return {
            userLoginFilled: {
                email: "",
                password: ""
            },
            loginFailErrShow: false
        };
    },
    computed: {
        ...mapGetters("auth", {user: "user"}),
    },
    methods: {
        ...mapActions("auth", ["login"]),
        loginUser(userLoginFilled) {
            this.$refs["loginForm"].validate(valid => {
                if (valid) {
                    const email = userLoginFilled.email;
                    const password = userLoginFilled.password;
                    this.login({ email, password }).then(result => {
                        this.loginFailErrShow = result.errors.length != 0;
                        router.push("/post/postlist");
                    });
                }
            });
        },
    }
}
</script>
<style>
.LoginIn-Form {
  position: absolute;
  width: 25vw;
  margin: auto;
  margin-top: 3rem;
  right: 0;
  left: 0;
}
.loginTitle{
    color: #606266;
    text-align: center;
}
.login-button{
    text-align: center;
}
.login-rememeber {
    text-align: center;
}
.LoginIn-Form .el-checkbox__label {
    font-size: 18px !important;
}
.LoginLogo {
  width: 20%;
  height: 20%;
}
.loginLogo-layout {
    width: 100%;
    text-align: center;
}
.LoginIn-Form .el-form-item__label {
    font-size: 18px !important;
}
</style>