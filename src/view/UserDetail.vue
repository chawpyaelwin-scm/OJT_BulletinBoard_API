<template>
    <div class="UserDetail-Container">
        <h2 class="UserDetail-Header">User Detail Form</h2>
        <div class="UserProfile-layout">
            <img :src="user.profile" class="user-profile"/>
        </div>
        <div class="UserInfo-layout">
            <el-row>
                <el-col :span="14">
                    <span>Name</span>
                </el-col>
                <el-col :span="10">
                    <span>{{user.name}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <span>Email</span>
                </el-col>
                <el-col :span="10">
                    <span>{{user.email}}</span>
                </el-col>
            </el-row>
            <el-row v-if="role === 'User'">
                <el-col :span="14">
                    <span>Password</span>
                </el-col>
                <el-col :span="10">
                    <span>{{user.password}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <span>Type</span>
                </el-col>
                <el-col :span="10">
                    <span>{{user.type}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <span>Phone</span>
                </el-col>
                <el-col :span="10">
                    <span>{{user.phone}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <span>Date Of Birth</span>
                </el-col>
                <el-col :span="10">
                    <span>{{user.dob}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <span>Address</span>
                </el-col>
                <el-col :span="10">
                    <span>{{user.address}}</span>
                </el-col>
            </el-row>
        </div>
        <div class="UserDetail-Btn">
            <el-button type="primary" @click="Detail()">OK</el-button>
            <el-button type="primary" @click="EditUserInfo(user.id)" v-if="role !== 'admin'">Edit</el-button>
        </div>
    </div>
</template>

<script>
import {  mapActions,mapGetters } from "vuex";
import { router } from "../router";

export default {
    data() {
        return {
            role: null,
        }
    },
    created() {
        this.role = localStorage.getItem("role");
        this.resetState();
        this.fetchData(this.$route.params.id);
    },
    computed: {
    ...mapGetters("user", {user: "user"}),
    },
    methods: {
        ...mapActions("user", ["fetchData","resetState"]), 
        onSubmit() {
            this.userCreation();
        },
        cancelPost() {
            this.resetState();
        },
        Detail() {
            if(this.role === "admin") {
                router.push("/user/userlist/");
            } else {
                router.push("/post/postlist/");
            }
        },
        EditUserInfo(userId) {
            if(userId) {
                router.push("/user/update/"+ userId);
            } 
        }
    }
}
</script>
<style>
.UserDetail-Container{
    position: absolute;
    width: 40vw;
    margin: auto;
    right: 0;
    left: 0;
    color: #606266;
}
.UserDetail-Header {
    text-align: center;
    margin-bottom: 2rem; 
}
.UserDetail-Container .el-form-item__label {
    font-size: 18px !important;
}
.user-profile {
    width: 100%;
    height: 100%;
}
.UserProfile-layout {
    position: absolute;
    width: 24%;
    height: 120px;
    border: 1px solid #e6e6e6;
}
.UserInfo-layout .el-col-14 {
    height: 50px;
    text-align: center;
}
.UserDetail-Btn {
    text-align: center;
}
</style>