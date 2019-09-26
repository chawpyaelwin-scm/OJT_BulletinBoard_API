<template>
    <div class="PostUpload-Container">
        <h2 class="PostUpload-Header">File Upload Form</h2>
        <div id="hideUploadPost"></div>
        <div class="PostUpload-Inner">
            <el-upload
                action="null"
                class="fileUpload"
                :on-change="UploadFile"
                :auto-upload="false"
                :multiple="false"
                accept=".csv"
            >
                <span class="fileUpload-label">Import File From: </span>
                <el-button size="small" type="primary" class="ChooseUpload-btn">Click to upload</el-button>
            </el-upload>
        </div>
        <el-dialog class="UploadSuccessDialog" :visible.sync="uploadFileSuccess" width="30%" center>
            <div>Excel File Upload Success!</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="SuccessUpload()">OK</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions,mapGetters } from "vuex";
import { router } from "../router";
import { log } from 'util';
export default {
    data() {
        return {
            uploadFileSuccess: false
        }
    },
    created() {

    },
     computed: {
    },
    methods: {
        ...mapActions("post", ["uploadPosts"]),
        UploadFile(e) {
            var reader = new FileReader();
            reader.onload = (e) => {
                var uploadData = e.target.result;                
                this.uploadPosts(uploadData);
                this.uploadFileSuccess = uploadData ? true: false;
            };                       
            reader.readAsDataURL(e.raw); 
        },
        SuccessUpload() {
            this.uploadFileSuccess = false;
            router.push("/post/postlist");
        }
    }
}
</script>
<style>
.PostUpload-Container{
    position: absolute;
    width: 50vw;
    margin: auto;
    text-align: center;
    border: 1px solid #e6e6e6;
    right: 0;
    left: 0;
    margin-top: 5rem;
    color: #606266;
}
.PostUpload-Inner {
    margin-bottom: 2rem;
    margin-top: 2rem;
}
.UploadSuccessDialog {
    font-size: 18px;
}
.UploadSuccessDialog .el-dialog--center .el-dialog__body {
  text-align: center;
  font-size: 18px;
}
</style>