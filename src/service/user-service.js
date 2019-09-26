import Axios from "axios";

export const userService = {
  login, 
  getUser,
  getUserList,
  logout,
  signup,
  deleteUser,
  updateUser,
  changePassword
}

function login(email, password) {
  const result = Axios({
    method: "POST",
    url: process.env.VUE_APP_ROOT_API + "/user/login",
    data: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json"
    }
  });
  return result;
}

async function getUser(id) {
  const result = await Axios({
      method: "GET",
      url: process.env.VUE_APP_ROOT_API + "/user/" + id,
      headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token")
      }
  });
  
  return result.data.body.user;
}

async function getUserList(searchData) {
  if(searchData !== undefined) {
    var name = searchData.name;
    var email = searchData.email;
  }
  const result = await Axios({
      method: "GET",
      params: {name, email},
      url: process.env.VUE_APP_ROOT_API + "/user",
      headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token")
      }
  });

  return result.data.body.users;
}

function logout() {
  const result = Axios({
    method: "POST",
    url: process.env.VUE_APP_ROOT_API + "/user/logout",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }    
  });
  return result;  
}

/**
 * Delete user
 */
function deleteUser(id) {
  const result = Axios({
    method: "DELETE",
    url: process.env.VUE_APP_ROOT_API + "/user/delete/"+ id,
    data: JSON.stringify({ id }),
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  });

  return result;
}


function signup(user) {
    const name = user.name;    
    const email = user.email;
    const password = user.password;
    const type = user.type;
    const phone = user.phone;
    const dob = user.dob;
    const address = user.address;
    const profile = user.profile;
    
    const result = Axios({
      method: "POST",
      url: process.env.VUE_APP_ROOT_API + "/user/add",
      data: JSON.stringify({name,email,password,type,phone,dob,address,profile }),
      headers: {
      "content-type": "application/json"
      }
    });    
    return result;
 }

  /**
 * Update User Password
 */
async function changePassword(oldPassword,newPassword,confirmPassword) {  
  const result = await Axios({
    method: "PUT",
    url: process.env.VUE_APP_ROOT_API + "/user/password",
    data: JSON.stringify({oldPassword,newPassword,confirmPassword}),
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  });
  
  return result.data.body;
}

 /**
 * Update User
 */
function updateUser(user) {
  const name = user.name;    
  const email = user.email;
  const password = user.password;
  const type = user.type;
  const phone = user.phone;
  const dob = user.dob;
  const address = user.address;
  const profile = user.profile;
  const id = user.id;

  const result = Axios({
    method: "PUT",
    url: process.env.VUE_APP_ROOT_API + "/user/update/"+ id,
    data: JSON.stringify({name,email,password,type,phone,dob,address,profile}),
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  });

  return result;  
}

