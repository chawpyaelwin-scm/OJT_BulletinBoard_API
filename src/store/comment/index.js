import { userService } from "../../service";
import { commentService } from "../../service";
import { router } from "../../router";

/**
 *  Initial state of comment
 */
function initialState() {
    return {
        commentList: [],
        commentData: {
            id: '',
            comment: '',
            postId: '',
        },
        commentOriginal: {}
    };
}

/**
 *  Getters of comment
 */
const getters = {
    commentList: state => state.commentList,
    commentData: state => state.commentData,
    commentOriginal: state =>state.commentOriginal,
};

/**
 * Actions of the comment
 */
const actions = {
    async getCommentList({ commit }, searchData) {
        const users = await userService.getUserList();
        commentService.getCommentList(searchData).then(
            comments => {                
                var date, year, month, monthData, dt, day, createdAt;
                for (var index = 0; index < comments.length; index++) {
                    date = new Date(comments[index].created_at);
                    year = date.getFullYear();
                    month = date.getMonth() + 1;
                    monthData = month > 9 ? month : "0" + month;
                    dt = date.getDate();
                    day = dt > 9 ? dt : "0" + dt;
                    createdAt = year + "/" + monthData + "/" + day;
                    comments[index].created_at = createdAt;
                    if (users) {
                        for (var userIndex = 0; userIndex < users.length; userIndex++) {
                            if (comments[index].created_user_id === users[userIndex].id) {
                                comments[index].created_user_id = users[userIndex].name;
                            }
                        }
                    }
                }
                commit("commentListSuccess", comments);
            }
        );
    },

    getComment({ commit }, id) {
        commentService.getComment(id).then(
            comment => {
                commit("commentListSuccess", comment);
            }
        );
    },

    async getCommentByPostId({ commit, state }, postId) {
        const users = await userService.getUserList();
        setTimeout(() => {
            commentService.getCommentByPostId(postId).then(
            comments => { 
                state.commentOriginal = comments;               
                var date, year, month, monthData, dt, day, createdAt;
                for (var index = 0; index < comments.length; index++) {
                    date = new Date(comments[index].created_at);
                    year = date.getFullYear();
                    month = date.getMonth() + 1;
                    monthData = month > 9 ? month : "0" + month;
                    dt = date.getDate();
                    day = dt > 9 ? dt : "0" + dt;
                    createdAt = year + "/" + monthData + "/" + day;
                    comments[index].created_at = createdAt;
                    if (users) {
                        for (var userIndex = 0; userIndex < users.length; userIndex++) {
                            if (comments[index].created_user_id === users[userIndex].id) {
                                comments[index].created_user_id = users[userIndex].name;
                            }
                        }
                    }
                }
                commit("commentListSuccess", comments);
            });
        }, 250);
    },

    deletedComment({ dispatch }, id) {
        commentService.deleteComment(id)
            .then(comment => {
                dispatch("getCommentList");
            }
            );
    },

    commentCreation({ dispatch, commit, state }) {
        commentService.createComment(state.commentData)
            .then(comment => {
                commit("resetState");
            },
                error => {
                    var errorMessage = error.response.data.errors[0].message;
                    console.log("Err...", errorMessage);
                });
    },

    updateComment({ dispatch, commit, state }) {
        commentService.updateComment(state.commentData)
            .then(comment => {
                commit("resetState");
            },
                error => {
                    const errorMessage = error.response.data.errors[0].message;
                    console.log("Err...", errorMessage);
                });
    },

    fetchComment({ commit }, id) {
        commentService.getComment(id).then(
            comment => {
                var createDate, year, month, monthData, dt, day, createdAt;
                createDate = new Date(comment.created_at);
                year = createDate.getFullYear();
                month = createDate.getMonth() + 1;
                monthData = month > 9 ? month : "0" + month;
                dt = createDate.getDate();
                day = dt > 9 ? dt : "0" + dt;
                createdAt = year + "/" + monthData + "/" + day;
                comment.created_at = createdAt;
                userService.getUser(comment.created_user_id).then(user => {
                    comment.created_user_id = user.name;
                    commit("setItem", comment);
                })
            })
    },

    resetState({ commit }) {
        commit("resetState");
    }
};

/**
 * Mutations of comment
 */
const mutations = {
    commentListSuccess(state, comment) {
        state.commentList = comment;
    },
    setItem(state, commentData) {
        state.commentData.id = commentData.id;
        state.commentData.comment = commentData.comment;
        state.commentData.postId = commentData.postId;        
    },
    resetState(state) {
        state = Object.assign(state, initialState());
    },
};

export const comment = {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
};
