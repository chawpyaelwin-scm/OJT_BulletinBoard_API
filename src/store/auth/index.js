import { userService } from "../../service";

/**
 * State of auth
 */
function initialState() {
  return {
    user: {
      
    },
  };
}
/**
 *  Getters of auth
 */

const getters = {
  user: state => state.user,
};

/**
 * Actions of auth
 */
const actions = {
  async login({ dispatch, commit }, { email, password }) {
    const result = await userService.login(email, password);
    const userData = result.data.body;
    if(userData.token && userData.user) {
      const userRole = userData.user.type == "0" ? "admin" :"user";
      localStorage.setItem("token", userData.token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("user", JSON.stringify(userData.user)); 
    }
    return userData; 
  },

  logout({ commit }) {
    userService.logout().then( 
      user => {         
        localStorage.clear();
        commit("logoutSuccess"); 
    });  
  },
};

/**
 * Mutations of auth
 */
const mutations = {
  loginSuccess(state, user) {    
    state.user = user;    
  },
  logoutSuccess(state) { 
    state.user = {};
  },
  resetState(state) {
    state = Object.assign(state, initialState());
  }
};

export const auth = {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
};
