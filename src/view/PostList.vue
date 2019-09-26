<template>
  <div class="PostList-Container">
    <div class="PostList-ButtonGroup">
      <el-row :gutter="24" class="PostList-Buttons">
        <el-col :span="3.5">
          <el-input
            v-model="searchData.title"
            placeholder="Search By Title..."
            @change="searchPost()"
          ></el-input>
        </el-col>
        <el-col :span="3.5">
          <el-input
            v-model="searchData.createdUser"
            placeholder="Search By Created User..."
            @change="searchPost()"
          ></el-input>
        </el-col>
        <el-col :span="3.5">
          <el-button type="primary" class="post-btn" @click="searchPost()">Search</el-button>
        </el-col>
        <el-col :span="3.5">
          <el-button type="primary" class="post-btn" @click="addPost()">Add</el-button>
        </el-col>
        <el-col :span="3.5">
          <el-button type="primary" class="post-btn" @click="uploadPost()">Upload</el-button>
        </el-col>
        <el-col :span="3.5">
          <el-button type="primary" class="post-btn" @click="postDownloadDialogShow = true">Download</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="UserPostList-Container" v-if="role === 'user'">
      <el-col :span="5" v-for="(post,index) in postData" :key="index">
        <el-card :class="getCardColor(post.created_user_id, user.name)" class="postCard">
          <div slot="header" class="post-card-header">
            <span class="postCreatedUserName">{{post.created_user_id}}</span>
            <span style="float:right">{{post.created_at}}</span>
          </div>
          <div class="post-card-body">
            <h4 class="post-title">{{post.title}}</h4>
            <div class="postDescription" @click="postDetail(post.id)">
              <span v-if="post.description.length > 101">{{post.description.substring(0, 101)}}. . .</span>
              <span v-else>{{post.description}}</span>
            </div>
            <div class="postCard-btns">
              <el-button
                type="primary"
                @click="postUpdate(post.id)"
                v-if="post.created_user_id === user.name"
              >Edit</el-button>
              <el-button
                type="danger"
                @click="postDelete(post.id)"
                v-if="post.created_user_id === user.name"
              >Delete</el-button>
              <el-button
                type="secondary"
                class="commentButton"
                @click="postComment(post.id)"
              >Comment</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="None-Post" v-if="postData.length == 0 && role === 'user'">
      <h1>Nothing To Show!!!!</h1>
    </div>
    <el-table
      :data="postData"
      class="PostTable"
      border
      header-row-class-name="PostTable-HeaderRow"
      header-cell-class-name="PostTable-HeaderCell"
      cell-class-name="PostTable-Cell"
      style="width: 100%"
      v-if="role === 'admin'"
    >
      <el-table-column prop="title" label="Post Title">
        <template slot-scope="scope">
          <el-button type="text" @click="postDetail(scope.row.id)">{{scope.row.title}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Post Description" width="300"></el-table-column>
      <el-table-column prop="created_user_id" label="Post User"></el-table-column>
      <el-table-column prop="created_at" label="Created Date"></el-table-column>
      <el-table-column label="Post Edit">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="postUpdate(scope.row.id)"
            v-if="scope.row.created_user_id === user.name"
          >Edit</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Post Delete">
        <template slot-scope="scope">
          <el-button
            type="danger"
            @click="postDelete(scope.row.id)"
            v-if="scope.row.created_user_id === user.name"
          >Delete</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Comment">
        <template slot-scope="scope">
          <el-button type="secondary" @click="postComment(scope.row.id)">Comment</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="DetailDialog" :visible.sync="postDetailDialogShow" width="30%" center>
      <h2 class="postCreateUser">{{detail.created_user_id}}</h2>
      <div class="DetailTable">
        <el-row>
          <el-col :span="10">
            <span>Title</span>
          </el-col>
          <el-col :span="14">
            <span>{{detail.title}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <span>Description</span>
          </el-col>
          <el-col :span="14">
            <span>{{detail.description}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <span>Status</span>
          </el-col>
          <el-col :span="14">
            <span>{{detail.status}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <span>Created At</span>
          </el-col>
          <el-col :span="14">
            <span>{{detail.created_at}}</span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="postDetailDialogShow = false">OK</el-button>
      </span>
    </el-dialog>
    <el-dialog class="DeleteDialog" :visible.sync="postDeleteDialogShow" width="30%" center>
      <span>Are you sure to delete?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="postDeleteDialogShow = false">Cancel</el-button>
        <el-button type="danger" @click="deleteConfirm()">Delete</el-button>
      </span>
    </el-dialog>
    <el-dialog class="DownloadDialog" :visible.sync="postDownloadDialogShow" width="30%" center>
      <span>Are you sure to download posts as excel format?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="postDownloadDialogShow = false">Cancel</el-button>
        <el-button type="primary" @click="DownloadConfirm()">OK</el-button>
      </span>
    </el-dialog>
    <el-dialog class="DownloadDialog" :visible.sync="downloadSuccessDialogShow" width="30%" center>
      <div>Excel File Download Success!</div>
      <div>File Name: {{excelFileName}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="SuccessDownload()">OK</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="commentDialogShow" width="30%" class="CommentDialog">
      <div class="commentDialog-header">
        <div>
          <h2>{{detail.title}}</h2>
          <div class="descriptionForCmt">
            <span>{{detail.description}}</span>
          </div>
          <el-row :gutter="24">
            <el-col :span="20">
              <el-input v-model="userComment" placeholder="Enter your comment..."></el-input>
            </el-col>
            <el-col :span="4" style="padding-left: 0px;">
              <el-button type="primary" @click="sendComment()" v-if="!editId">Send</el-button>
              <el-button type="primary" @click="editComment()" style="width:54px;" v-else>Edit</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="commentContainer">
          <div v-for="(indexComment, index) in commentList" :key="index" class="commentRowData">
            <div class="commentRowHeader">
              <span class="commentCreatedUserName">{{commentList[index].created_user_id}}</span>
              <el-row style="float: right;" :gutter="24">
                <el-col
                  :span="9.5"
                  style="padding-right: 0px;"
                  v-if="user.id == detail.created_user_id || user.name == commentList[index].created_user_id"
                >
                  <i
                    class="el-icon-edit CommentEditBtn"
                    @click="editCommentData(commentList[index].id)"
                  ></i>
                  <i
                    class="el-icon-error CommentDeleteBtn"
                    @click="deleteComment(commentList[index].id)"
                  ></i>
                </el-col>
                <el-col :span="14.5">
                  <span>{{commentList[index].created_at}}</span>
                </el-col>
              </el-row>
            </div>
            <span>{{commentList[index].comment}}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { router } from "../router";
import { log } from "util";

export default {
  data() {
    return {
      postDetailDialogShow: false,
      postDeleteDialogShow: false,
      postDeleteId: null,
      postDownloadDialogShow: false,
      downloadSuccessDialogShow: false,
      commentDialogShow: false,
      excelFileName: null,
      searchData: {
        title: "",
        createdUser: ""
      },
      user: null,
      role: null,
      userComment: null,
      commentPostId: null,
      editId: null
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.role = localStorage.getItem("role");
    this.getPostList();
  },
  mounted() {},
  computed: {
    ...mapGetters("post", {
      postData: "postList",
      totals: "totalPost",
      detail: "post"
    }),
    ...mapGetters("comment", {
      commentList: "commentList",
      commentData: "commentData",
      commentOriginal: "commentOriginal"
    })
  },
  methods: {
    ...mapActions("post", [
      "getPostList",
      "getPost",
      "fetchData",
      "deletedPost",
      "downloadPosts",
      "getPostByTitle"
    ]),
    ...mapActions("comment", [
      "getCommentList",
      "fetchComment",
      "deletedComment",
      "updateComment",
      "commentCreation",
      "getCommentByPostId"
    ]),
    postDetail(postId) {
      if (postId) {
        this.postDetailDialogShow = true;
        this.fetchData(postId);
      }
    },
    addPost() {
      router.push("/post/create");
    },
    postUpdate(postId) {
      if (postId) {
        router.push("/post/update/" + postId);
      }
    },
    postDelete(postId) {
      if (postId) {
        this.postDeleteDialogShow = true;
        this.postDeleteId = postId;
      }
    },
    postComment(postId) {
      this.commentPostId = postId;
      this.getCommentByPostId(postId);
      this.getPost(postId);
      this.commentDialogShow = true;
    },
    sendComment() {
      this.commentData.postId = this.commentPostId;
      this.commentData.comment = this.userComment;
      this.commentCreation();
      this.getCommentByPostId(this.commentData.postId);
      this.userComment = null;
    },
    deleteConfirm() {
      const postId = this.postDeleteId;
      this.deletedPost(postId);
      this.postDeleteDialogShow = false;
    },
    async DownloadConfirm() {
      const downloadPost = await this.downloadPosts();
      if (downloadPost.data) {
        this.excelFileName = downloadPost.filename;
        this.downloadSuccessDialogShow = true;
        this.postDownloadDialogShow = false;
      }
    },
    SuccessDownload() {
      this.downloadSuccessDialogShow = false;
      this.postDownloadDialogShow = false;
    },
    uploadPost() {
      router.push("/post/upload");
    },
    searchPost() {
      this.getPostList(this.searchData);
    },
    getCardColor(creater, user) {
      if (creater === user) {
        return "myCardColor";
      }
      return "yourCardColor";
    },
    deleteComment(commentId) {
      this.deletedComment(commentId);
    },
    editCommentData(commentId) {
      this.editId = commentId;
      this.fetchComment(commentId);
      setTimeout(() => {
        this.userComment = this.commentData.comment;
      }, 200);
    },
    editComment() {
      this.commentData.comment = this.userComment;
      this.commentData.postId = this.commentPostId;
      this.updateComment(this.editId);
      this.getCommentByPostId(this.commentData.postId);
      this.userComment = null;
      this.editId = null;
    }
  }
};
</script>
<style>
.PostTable {
  margin-top: 1rem;
}
.PostTable .PostTable-HeaderCell,
.PostTable .PostTable-Cell {
  text-align: center;
}
.PostList-Container {
  margin-top: 1rem;
}
.post-btn {
  width: 6.5rem;
}
.DetailTable {
  border: 1px solid #e6e6e6;
  font-size: 17px;
}
.DetailTable .el-row {
  margin: 1rem;
}
.DetailDialog .el-dialog__header {
  padding: 0;
}
.postCreateUser {
  color: rgb(3, 133, 219);
}
.DetailDialog .el-dialog__body {
  padding-bottom: 2px;
}
.DeleteDialog .el-dialog--center .el-dialog__body {
  text-align: center;
  font-size: 18px;
}
.DownloadDialog .el-dialog--center .el-dialog__body {
  text-align: center;
  font-size: 18px;
}
.PostList-Buttons {
  margin-left: 1% !important;
  margin-right: 0px !important;
}
.post-card-body .el-button {
  padding: 6px 10px !important;
}
.postCard {
  border: 1px solid #706e6e;
  height: 15rem;
}
.UserPostList-Container {
  width: 100%;
  margin-top: 2rem;
}
.UserPostList-Container .el-col {
  margin: 1rem;
}
.myCardColor {
  background: rgb(95, 206, 240);
}
.yourCardColor {
  background: #e6e6e6;
}
.UserPostList-Container .el-card__body {
  padding: 10px !important;
}
.None-Post {
  position: absolute;
  width: 50vw;
  margin: auto;
  right: 0;
  left: 0;
  margin-top: 8rem;
  text-align: center;
  color: rgb(3, 133, 219);
}
.post-card-body .post-title {
  text-align: center;
  margin-top: 0px;
}
.post-card-header {
  font-weight: 20px;
}
.postDescription {
  height: 5rem;
  margin-bottom: 1rem;
}
.postCreatedUserName {
  font-size: 17px;
  font-weight: bold;
}
.commentCreatedUserName {
  font-size: 13px;
  font-weight: bold;
}
.commentButton {
  float: right;
  border: 1px solid #706e6e;
}
.PostList-Container .CommentDialog .el-dialog__header {
  padding: 0px;
}
.descriptionForCmt {
  margin-bottom: 1rem;
}
.CommentDialog .el-dialog__headerbtn .el-dialog__close {
  visibility: hidden;
}
.CommentDialog .el-input__inner {
  height: 28px !important;
}
.CommentDialog .el-button {
  padding: 6px 10px !important;
}
.commentContainer .commentRowData {
  margin: 1rem;
  border-bottom: 1px solid #ebeef5;
}
.commentContainer {
  border-left: 1px solid rgb(215, 217, 223);
  border-right: 1px solid rgb(215, 217, 223);
  max-height: 150px;
  overflow: auto;
  margin-top: 1rem;
}
.commentRowHeader {
  margin-bottom: 1rem;
}
.CommentDialog ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.commentRowHeader .CommentEditBtn {
  color: #409eff;
}
.commentRowHeader .CommentDeleteBtn {
  margin-left: 0.5rem;
  color: #dd6161;
}
</style>