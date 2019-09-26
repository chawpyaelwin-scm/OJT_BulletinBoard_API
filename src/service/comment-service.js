import Axios from "axios";

export const commentService = {
    getCommentList,
    getComment,
    getCommentByPostId,
    createComment,
    updateComment,
    deleteComment,
};


/**
 * get all comment
 */
async function getCommentList(searchData) {
    if (searchData !== undefined) {
        var post_id = searchData.postId;
        var createdUser = searchData.createdUser;
    }

    const result = await Axios({
        method: "GET",
        url: process.env.VUE_APP_ROOT_API + "/comment",
        params: { post_id, createdUser },
        headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token")
        }
    });
    
    return result.data.body.comments;
}

/**
 * get a comment
 */
async function getComment(id) {
    const result = await Axios({
        method: "GET",
        url: process.env.VUE_APP_ROOT_API + "/comment/" + id,
        headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token")
        }
    });

    return result.data.body.comment;
}

/**
 * get a comment by post id
 */
async function getCommentByPostId(postId) {
    const result = await Axios({
        method: "GET",
        url: process.env.VUE_APP_ROOT_API + "/comment/postId/" + postId,
        headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token")
        }
    });

    return result.data.body.comment;
}

/**
 * Create comment
 */
function createComment(commentParam) {
    const comment = commentParam.comment;
    const post_id = commentParam.postId;
    const result = Axios({
        method: "POST",
        url: process.env.VUE_APP_ROOT_API + "/comment/add",
        data: JSON.stringify({ comment, post_id }),
        headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token")
        }
    });

    return result;
}


/**
 * Update comment
 */
function updateComment(commentParam) {
    const comment = commentParam.comment;
    const post_id = commentParam.postId;
    const id = commentParam.id;

    const result = Axios({
        method: "PUT",
        url: process.env.VUE_APP_ROOT_API + "/comment/update/" + id,
        data: JSON.stringify({ comment, post_id }),
        headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token")
        }
    });

    return result;
}

/**
 * Delete comment
 */
function deleteComment(id) {
    const result = Axios({
        method: "DELETE",
        url: process.env.VUE_APP_ROOT_API + "/comment/delete/" + id,
        data: JSON.stringify({ id }),
        headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token")
        }
    });

    return result;
}