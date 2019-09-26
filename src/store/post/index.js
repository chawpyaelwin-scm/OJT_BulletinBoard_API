import { postService } from "../../service";
import { userService } from "../../service";
import { router } from "../../router";

/**
 *  Initial state of post
 */
function initialState() {
  return {
    postList: [],
    post: {
      id: '',
      title: '',
      description: '',
      status: '',
    },
  }; 
}

/**
 *  Getters of post
 */
const getters = {
    postList: state => state.postList,
    post: state => state.post,
    upload: state => state.upload,
};

/**
 * Actions of the post
 */
const actions = {
  async getPostList({ commit }, searchData ) {
    const users = await userService.getUserList();
      postService.getPostList(searchData).then(
        posts => {   
          var date, year, month, monthData, dt, day, createdAt;
          for(var index = 0; index < posts.length; index++) {
            date = new Date(posts[index].created_at);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            monthData = month > 9 ? month : "0"+month;
            dt = date.getDate();
            day = dt > 9 ? dt : "0"+dt;
            createdAt = year+"/"+monthData+"/"+day;
            posts[index].created_at = createdAt;      
            if(users) {
              for(var userIndex = 0; userIndex < users.length; userIndex++) {
                if(posts[index].created_user_id === users[userIndex].id) {
                  posts[index].created_user_id = users[userIndex].name;
                }
              }
            }    
          } 
          commit("postListSuccess", posts);
        }
      );
  },

  getPost({ commit }, id) {
    postService.getPost(id).then(
      post => {          
        commit("postSuccess", post); 
      }
    );
  },

  async downloadPosts({ commit }) {
    const downloadPost = await postService.downloadPost();
    
    return downloadPost.data.body;
  },

  deletedPost({ dispatch }, id) {        
    postService.deletePost( id )
    .then(post => {  
      dispatch("getPostList");
    }) 
  }, 

  postCreation({ dispatch,commit, state}) {        
    postService.createPost(state.post)
    .then(post => { 
      commit("resetState");  
      router.push("/post/postlist");
    },
    error => {       
      var errorMessage = error.response.data.errors[0].message;
       console.log("Err...", errorMessage);
    });         
  },

  uploadPosts({ commit, state }, uploadData) {
    postService.uploadPost(uploadData);
  },

  updatePost({ dispatch,commit, state}) {    
    postService.updatePost( state.post )
      .then(post => { 
        commit("resetState");
      },
      error => {
        const errorMessage = error.response.data.errors[0].message; 
        console.log("Err...", errorMessage);
      });
  },

  fetchData({ commit }, id) {            
    postService.getPost(id).then(
      post => {      
        var createDate, year, month, monthData, dt, day, createdAt;     
        createDate = new Date(post.created_at);
        year = createDate.getFullYear();
        month = createDate.getMonth() + 1;
        monthData = month > 9 ? month : "0"+month;
        dt = createDate.getDate();
        day = dt > 9 ? dt : "0"+dt;
        createdAt = year+"/"+monthData+"/"+day;
        post.created_at = createdAt;      
        userService.getUser(post.created_user_id).then(user => {          
          post.created_user_id = user.name;
          post.status = post.status === "1" ? true : false;
          commit("setItem", post);           
        })
    })        
  }, 

  getPostByTitle({ commit }, title) {
    postService.getPostByTitle(title).then(
      post => {                  
        // commit("postListSuccess", post);
      }
    )
  },
  resetState({ commit }) {
    commit("resetState");
  }
};

/**
 * Mutations of post
 */
const mutations = {
  postListSuccess(state, post) {
    state.postList =  post;
  },
  postSuccess(state, post) {
    state.post = post;
  },
  setItem(state, post) {
    state.post.id = post.id; 
    state.post.title = post.title;
    state.post.description = post.description;  
    state.post.status = post.status;
    state.post.created_user_id = post.created_user_id;
    state.post.created_at = post.created_at;
  },
  resetState(state) {
    state = Object.assign(state, initialState());
  },
};

export const post = {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
};
