<template>
  <div class="TheHeader">
    <div class="leftColumn">
      <img class="HeaderLogo" src="@/assets/bulletinLogo.png"/>
      <h2 class="HeaderTitle">SCM Bulletin Board</h2>
    </div>
    <div class="centerColumn">
      <div class="HeaderLink">
        <el-link class="leftLink" v-if="role === 'admin'"  @click="AllUser()">Users</el-link>
        <el-link class="centerLink" v-else-if="role === 'user'" @click="UserDetail()">User</el-link>
        <el-link class="rightLink" v-if="role" @click="AllPost()">Posts</el-link>
      </div>
    </div>
    <div
      class="rightColumn"
      v-if="role"
    >
      <span class="LogIn-User">{{email}}</span>
      <el-button class="LogOut-button" @click="Logout()">Logout</el-button>
    </div>
  </div>
</template>
<script>
import { router } from "../router";
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
      const user = JSON.parse(localStorage.getItem("user"));
      return {
        role: "",
        email: user.email,
        id: user.id
      }
    },
    created() {
        this.role = localStorage.getItem("role");
    },
    methods: {
      ...mapActions("auth", ["logout"]),
      AllPost() {
        router.push("/post/postlist");
      },
      Logout() {
        this.logout();
        router.push("/login");
      },
      AllUser() {
        router.push("/user/userlist");
      },
      UserDetail() {
        router.push("/user/detail/"+ this.id);
      }
    }
}
</script>
<style>
.leftColumn {
  display: flex;
  flex: 1;
  align-items: center;
}
.rightColumn {
  display: flex;
  flex: 1;
  align-items: center;
}
.centerColumn {
  flex: 2.3;
  display: flex;
  align-items: center;
}
.TheHeader {
  display: flex;
  border-bottom: solid 1px #e6e6e6;
  height: 62px;
}
.HeaderLogo {
  max-width: 100%;
  height: 80%;
  margin-left: 1rem;
}
.HeaderTitle {
  margin-left: 10px;
  color: rgb(3, 133, 219);
}
.HeaderLink{
  display: flex;
  flex: 1;
  height: 100%;
}
.leftLink,
.centerLink,
.rightLink {
  display: flex;
  flex: 0.1;
  text-align: center;
  border-left: 1px solid #e6e6e6;
}
.rightLink {
  border-right: 1px solid #e6e6e6;
}
.navigation {
  display: flex;
  margin-left: 15rem;
  justify-content: flex-end;
}
.LogIn-User{
  margin-right: 2rem;
  color: #606266;
}
.LogOut-button{
  float: right;
}
</style>