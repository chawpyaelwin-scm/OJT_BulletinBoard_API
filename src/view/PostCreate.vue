<template>
    <div class="PostCreation-Container">
        <h2 class="PostCreate-Header">Post Creation Form</h2>
        <el-form ref="form" :model="postItem" label-width="120px">
            <el-form-item label="Title">
                <el-input v-model="postItem.title"></el-input>
            </el-form-item>
            <el-form-item label="Description">
                <el-input type="textarea" v-model="postItem.description"></el-input>
            </el-form-item>
            <el-form-item label="Status">
                <el-switch v-model="status"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
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
            status: false,
        }
    },
    created() {
        this.resetState();
    },
    computed: {
    ...mapGetters("post", {postItem: "post"}),
    },
    methods: {
        ...mapActions("post", ["postCreation","resetState"]), 
        onSubmit() {
            this.postItem.status = this.status === true ? "1" : "0";
            this.postCreation();
        },
        cancelPost() {
            this.resetState();
            this.status = false;
        }
    }
}
</script>
<style>
.PostCreation-Container{
    position: absolute;
    width: 50vw;
    margin: auto;
    right: 0;
    left: 0;
}
.PostCreate-Header {
    text-align: center;
    color: #606266;
    margin-left: 5rem;
}
.PostCreation-Container .el-form-item__label {
    font-size: 18px !important;
}
</style>