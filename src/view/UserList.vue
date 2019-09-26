<template>
  <div class="UserList-Container">
    <div class="UserList-ButtonGroup">
      <el-row :gutter="20" class="UserList-Buttons">
        <el-col :span="3.5">
          <el-input
            placeholder="Search By Name..."
            v-model="searchData.name"
            @change="searchUser()"
          ></el-input>
        </el-col>
        <el-col :span="3.5">
          <el-input
            placeholder="Search By Email..."
            v-model="searchData.email"
            @change="searchUser()"
          ></el-input>
        </el-col>
        <!-- <el-col :span="3" >
                    <el-input placeholder="Create From"></el-input>
                </el-col>
                <el-col :span="3" >
                    <el-input placeholder="Create To"></el-input>
        </el-col>-->
        <el-col :span="2.5">
          <el-button type="primary" class="user-btn" @click="searchUser()">Search</el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" class="user-btn" @click="addUser()">Add</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="userData"
      class="UserTable"
      border
      header-row-class-name="UserTable-HeaderRow"
      header-cell-class-name="UserTable-HeaderCell"
      cell-class-name="UserTable-Cell"
      style="width: 100%"
    >
      <el-table-column prop="name" label="User Name">
        <template slot-scope="scope">
          <el-button type="text" @click="userDetail(scope.row.id)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Email"></el-table-column>
      <el-table-column prop="phone" label="Phone"></el-table-column>
      <el-table-column prop="dob" label="Birth Date"></el-table-column>
      <el-table-column prop="address" label="Address"></el-table-column>
      <el-table-column prop="created_at" label="Created Date"></el-table-column>
      <el-table-column prop="updated_at" label="Updated Date"></el-table-column>
      <el-table-column label="User Delete">
        <template slot-scope="scope">
          <el-button type="danger" @click="userDelete(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="DeleteDialog" :visible.sync="userDeleteDialogShow" width="30%" center>
      <span>Are you sure to delete?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDeleteDialogShow = false">Cancel</el-button>
        <el-button type="danger" @click="deleteConfirm()">Delete</el-button>
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
      userDeleteDialogShow: false,
      userDeleteId: null,
      searchData: {
        name: "",
        email: ""
      }
    };
  },
  created() {
    this.getUserList();
  },
  computed: {
    ...mapGetters("user", {
      userData: "userList",
      totals: "totalUser",
      detail: "user"
    })
  },
  methods: {
    ...mapActions("user", ["getUserList", "fetchData", "deletedUser"]),
    userDelete(userId) {
      if (userId) {
        this.userDeleteDialogShow = true;
        this.userDeleteId = userId;
      }
    },
    deleteConfirm() {
      const userId = this.userDeleteId;
      this.deletedUser(userId);
      this.userDeleteDialogShow = false;
    },
    addUser() {
      router.push("/user/signin");
    },
    userDetail(userId) {
      if (userId) {
        router.push("/user/detail/" + userId);
      }
    },
    searchUser() {
      this.getUserList(this.searchData);
    }
  }
};
</script>
<style>
.UserTable {
  margin-top: 1rem;
}
.UserTable .UserTable-HeaderCell,
.UserTable .UserTable-Cell {
  text-align: center;
}
.UserList-Container {
  margin-top: 1rem;
}
.user-btn {
  width: 7rem;
}
.UserList-Buttons {
  margin-left: 20% !important;
  margin-right: 0px !important;
}
</style>