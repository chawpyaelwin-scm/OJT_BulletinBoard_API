import { userService } from "../../service";
import { router } from "../../router";

/**
 *  Initial state of user
 */
function initialState() {
  return {
    userList: [],
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      type: '',
      phone: '',
      dob: '',
      address: '',
      profile: '',
      confirmPassword: ''
    },
    password: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
  };
}
/**
 *  Getters of useruser
 */
const getters = {
  userList: state => state.userList,
  user: state => state.user,
  password: state => state.password,
};

/**
 * Actions of the useruser
 */
const actions = {
  getUserList({ commit }, searchData) {
      userService.getUserList(searchData).then(
        users => {
          if (users) {
            var createDate, updateDate, year, month, monthData, dt, day, createdAt, updateAt;
            for (var index = 0; index < users.length; index++) {
              createDate = new Date(users[index].created_at);
              year = createDate.getFullYear();
              month = createDate.getMonth() + 1;
              monthData = month > 9 ? month : "0" + month;
              dt = createDate.getDate();
              day = dt > 9 ? dt : "0" + dt;
              createdAt = year + "/" + monthData + "/" + day;
              users[index].created_at = createdAt;

              updateDate = new Date(users[index].updated_at);
              year = updateDate.getFullYear();
              month = updateDate.getMonth() + 1;
              monthData = month > 9 ? month : "0" + month;
              dt = updateDate.getDate();
              day = dt > 9 ? dt : "0" + dt;
              updateAt = year + "/" + monthData + "/" + day;
              users[index].updated_at = updateAt;
            }
            commit("userListSuccess", users);
          }
        }
      );
  },
  deletedUser({ dispatch }, id) {
    userService.deleteUser(id)
      .then(user => {
        dispatch("getUserList");
      })
  },
  userCreation({ dispatch, commit, state }) {    
    userService.signup(state.user)
      .then(user => {
        commit("resetState");
        router.push("/user/userlist");
      },
      error => {
        var errorMessage = error.response.data.errors[0].message;
        console.log("Err...", errorMessage);
      });
  },
  updateUser({ dispatch, commit, state }) {
    userService.updateUser(state.user)
      .then(user => {
        commit("resetState");
      },
        error => {
          const errorMessage = error.response.data.errors[0].message;
          console.log("Err...", errorMessage);
        });
  },
  async updatePassword({ dispatch, commit, state }) {
    const result = await userService.changePassword(state.password.oldPassword, state.password.newPassword, state.password.confirmPassword);
    return result;      
  },
  fetchData({ commit }, id) {
    userService.getUser(id)
      .then(user => {
        commit("setItem", user);
      })
  },
  resetState({ commit }) {
    commit("resetState");
  }

};

/**
 * Mutations of user
 */
const mutations = {
  userListSuccess(state, users) {
    state.userList = users;
  },
  resetState(state) {
    state = Object.assign(state, initialState());
  },
  setItem(state, user) {
    state.user.id = user.id;
    state.user.name = user.name;
    state.user.email = user.email;
    state.user.password = user.password;
    state.user.type = user.type;
    state.user.phone = user.phone;
    state.user.dob = user.dob;
    state.user.address = user.address;
    state.user.profile = user.profile;
  },
};

export const user = {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
};
