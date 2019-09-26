<template>
    <div class="PostEdition-Container">
        <h2 class="PostEdit-Header">Post Update Form</h2> 
        <el-form ref="form" :model="postItem" label-width="120px">
            <el-form-item label="Title">
                <el-input v-model="postItem.title"></el-input>
            </el-form-item>
            <el-form-item label="Description">
                <el-input type="textarea" v-model="postItem.description"></el-input>
            </el-form-item>
            <el-form-item label="Status">
                <el-switch v-model="postItem.status"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="editPost">Update</el-button>
                <el-button @click="cancelPost">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {  mapActions,mapGetters } from "vuex";
import { router } from "../router";

export default {
    data() {
        return {

        }
    },
    created() {
        this.resetState();
        this.fetchData(this.$route.params.id);
    },
    watch: {
      "$route.params.id": function() {
        this.fetchData(this.$route.params.id);
      }
    },  
    computed: {
    ...mapGetters("post", {postItem: "post"}),
    },
    methods: {
        ...mapActions("post", ["updatePost","resetState","fetchData"]), 
        editPost() {            
            this.postItem.status = this.postItem.status === true ? "1" : "0";
            this.updatePost();
            router.push("/post/postlist");
        },
        cancelPost() {
            this.resetState();
        }
    }
}
</script>
<style>
.PostEdition-Container{
    position: absolute;
    width: 50vw;
    margin: auto;
    right: 0;
    left: 0;
}
.PostEdit-Header {
    text-align: center;
    color: #606266;
    margin-left: 5rem;
}
.PostEdition-Container .el-form-item__label {
    font-size: 18px !important;
}
</style>