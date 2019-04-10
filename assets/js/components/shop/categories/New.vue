<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="New-main">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/shop/categories' }">商品分类</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
        </el-breadcrumb>

        <h5>新增分类</h5>

        <el-form ref="category" :rules="rules" :model="category" label-width="80px">

            <el-col :span="16">

                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="category.name"></el-input>
                </el-form-item>

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


                <el-form-item label="商品分类" prop="parent_id">
                    <el-select v-model="category.parent_id" placeholder="请选择分类">
                        <!--<el-option label="顶级分类" :value="0"></el-option>-->
                        <el-option :label="item.name" :value="item.id" v-for="item in categories"
                                   :key="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="是否显示" prop="is_show">
                    <el-switch v-model="category.is_show"></el-switch>
                </el-form-item>

                <el-form-item label="排序" prop="sort_order">
                    <el-input v-model.number="category.sort_order"></el-input>
                </el-form-item>

                <el-form-item label="品牌描述" prop="description">
                    <el-input type="textarea" v-model="category.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('category')">立即创建</el-button>
                    <router-link :to="{name: 'Categories'}">
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
    export default {
        data() {
            return {
                categories: [],
                fileList:[],
                category: {
                    name: '',
                    is_show: true,
                    sort_order: 99,
                    parent_id: '',
                    description: '',
                    image:''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入品牌名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    parent_id: [
                        {required: true, message: '请选择分类', trigger: 'change'}
                    ],
                    description: [
                        {min: 0, max: 255, message: '不能超过255个字符', trigger: 'blur'}
                    ],
                    sort_order: [
                        {type: 'number', message: '排序内容必须是数字'}
                    ]
                },
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        created() {
            axios.get("http://localhost:8000/admin/shop/categories").then((response) => {
                this.categories = response.data.data.categories
            })
        },
        methods: {
            onSubmit(category) {
                this.$refs[category].validate((valid) => {            //验证表单
                    if (valid) {
                        axios.post("http://localhost:8000/admin/shop/categories", this.category).then(() => {
                            this.$message({
                                showClose: true,
                                message: '恭喜你，新增成功',
                                type: 'success'
                            });
                            this.$router.push({name: 'Categories'})
                        })
                    }
                })
            },
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleExceed(files, fileList) {
                this.$message({
                    showClose: true,
                    message: '只能上传一张图片，先删除后再上传！',
                    type: 'error'
                });
            },
            handleUploadSuccess(response, file, fileList) {
                this.category.image = response.image_url
            },
            handleRemove(file, fileList) {
                this.category.image = ''
            },
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


<style scoped>
    .New-main {
        margin: 30px 0 20px 16px;
    }

    .el-form {
        margin-top: 30px;
    }

    .el-main > div {
        text-align: left;
        padding-left: 20px;
    }

    h5 {
        padding-left: 16px;
        padding-top: 10px;
        font-size: 16px;
        font-weight: bold;
    }

    .el-header {
        text-align: left;
        padding: 20px 0 50px 30px;
        background-color: #fff;
    }
</style>
