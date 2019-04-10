<template>
    <div class="productNew">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="New-main">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/ads' }">广告管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑</el-breadcrumb-item>
        </el-breadcrumb>

        <h5>编辑管理</h5>

        <el-form ref="ad" :rules="rules" :model="ad" label-width="80px">

            <el-col :span="16">

                <el-form-item label="缩略图" prop="image">

                    <el-upload
                        class="upload-demo"
                        drag
                        action="/admin/photo"
                        :file-list="fileList"
                        list-type="picture"
                        :limit="1"
                        name="file"
                        :on-preview="handlePreview"
                        :on-exceed="handleExceed"
                        :on-success="handleUploadSuccess"
                        :on-remove="handleRemove"
                        :before-upload="beforeUpload">

                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="标题" prop="title">
                    <el-input v-model="ad.title"></el-input>
                </el-form-item>

                <el-form-item label="所属栏目" prop="category_id">
                    <el-select v-model="ad.category_id" placeholder="请选择分类">
                        <el-option :label="item.name" :value="item.id" v-for="item in categories"
                                   :key="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="描述信息" prop="description">
                    <el-input type="textarea" v-model="ad.description"></el-input>
                </el-form-item>

                <el-form-item label="排序" prop="sort_order">
                    <el-input v-model.number="ad.sort_order"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ad')">修改</el-button>
                    <router-link :to="{name: 'Ads'}">
                        <el-button>取消</el-button>
                    </router-link>
                </el-form-item>

            </el-col>

        </el-form>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

    </div>

</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        data() {
            return {
                fileList: [],
                ad: {
                    image: '',
                    title: '',
                    description: '',
                    sort_order: '',

                },
                rules: {
                    title: [
                        {required: true, message: '请输入广告名称', trigger: 'blur'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
                    ],
                    category_id: [
                        {required: true, message: '请选择分类', trigger: 'blur'}
                    ],
                },
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        created(){
            let id=this.$route.params.id
            axios.get(`http://localhost:8000/admin/ads/ads/${id}`).then(response=>{
                this.ad=response.data.data.ad
                this.fileList = [{ name:this.ad.image, url:this.ad.image}]
            })


            this.$store.dispatch('adCategories/getAllCategories')         //先去仓库请求

        },
        computed: {                                                          //从仓库调取数据
            ...mapState({
                categories: state => state.adCategories.categories})

        },
        methods: {
            onSubmit(ad) {
                this.$refs[ad].validate((valid) => {            //验证表单
                    if (valid) {
                        delete this.ad.category;
                        axios.put(`http://localhost:8000/admin/ads/ads/${this.ad.id}`, this.ad).then(() => {
                            this.$message({
                                showClose: true,
                                message: '恭喜你，编辑成功',
                                type: 'success'
                            });
                            this.$router.push({name: 'Ads'})
                        })
                    }
                })
            },
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
            ,
            handleExceed(files, fileList) {
                this.$message({
                    showClose: true,
                    message: '只能上传一张图片，先删除后再上传！',
                    type: 'error'
                });
            }
            ,
            handleUploadSuccess(response, file, fileList) {
                this.ad.image = response.image_url
            }
            ,
            handleRemove(file, fileList) {
                this.ad.image = ''
            }
            ,
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/gif';

                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG && !isGIF) {
                    this.$message.error('上传头像图片只能是 jpg/png/gif 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    return false;
                }
            }
        }
    }
</script>

<style>
    .productNew .New-main {
        margin: 30px 0 20px 16px;
    }

    .productNew .el-main > div {
        text-align: left;
        padding-left: 20px;
    }

    .productNew h5 {
        text-align: left;
        padding-left: 16px;
        padding-top: 10px;
        font-size: 16px;
        font-weight: bold;
    }

    .productNew .el-tab-pane .ql-editor {
        min-height: 500px;
    }

    .productNew .elmain {
        line-height: 0px;
        padding-left: 18px;
        padding-top: 10px;
    }

    .productNew .el-form {
        text-align: left;
    }

</style>
