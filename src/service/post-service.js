import Axios from "axios";

export const postService = { 
  getPostList,  
  getPost,
  getPostByTitle,
  createPost,
  updatePost,
  deletePost,
  downloadPost,
  uploadPost
};

async function getPostList(searchData) {
  if(searchData !== undefined) {
    var title = searchData.title;   
    var createdUser = searchData.createdUser;
  }
 
  const result = await Axios({
    method: "GET",
    url: process.env.VUE_APP_ROOT_API + "/post",
    params:{ title,createdUser },
    headers: {
    "content-type": "application/json",
    Authorization: localStorage.getItem("token")
    }
  });
  
  return result.data.body.posts;    
}

/**
 * get a post
 */
async function getPost(id) {  
  const result = await Axios({
      method: "GET",
      url: process.env.VUE_APP_ROOT_API + "/post/" + id,
      headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token")
      }
  });
  
  return result.data.body.post;
}

/**
 * get a post by title
 */
async function getPostByTitle(title) {  
  const result = await Axios({
      method: "GET",
      url: process.env.VUE_APP_ROOT_API + "/post/title",
      params: {title},
      headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token")
      }
  });
  
  return result.data.body.post;
}

/**
 * Create Post
 */
function createPost(post) {    
  const title = post.title;    
  const description = post.description;
  const status = post.status;
    const result = Axios({
    method: "POST",
    url: process.env.VUE_APP_ROOT_API + "/post/add",
    data: JSON.stringify({ title, description, status }),
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  });

  return result;
}

/**
 * Upload Post
 */
function uploadPost(upload) {          
  const result = Axios({
    method: "POST",
    url: process.env.VUE_APP_ROOT_API + "/post/upload",
    data: JSON.stringify( {upload} ),
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  });

  return result;
}

/**
 * Delete post
 */
function deletePost(id) {
  const result = Axios({
    method: "DELETE",
    url: process.env.VUE_APP_ROOT_API + "/post/delete/"+ id,
    data: JSON.stringify({ id }),
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  });

  return result;
}

/**
 * Update Post
 */
function updatePost(post) {
  const title = post.title;    
  const description = post.description;
  const status = post.status;
  const id= post.id;
  
  const result = Axios({
    method: "PUT",
    url: process.env.VUE_APP_ROOT_API + "/post/update/"+ id,
    data: JSON.stringify({ title,description,status }),
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  });

  return result;  
}

function downloadPost() {
  const result = Axios({
    method: "GET",
    url: process.env.VUE_APP_ROOT_API + "/excel/download",
    headers: {
    "content-type": "application/json",
    Authorization: localStorage.getItem("token")
    }
  });

  return result;    
}

