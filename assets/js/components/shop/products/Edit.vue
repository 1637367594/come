<template>
    <div class="productNew">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="New-main">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/shop/products' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑</el-breadcrumb-item>
        </el-breadcrumb>

        <h5>编辑管理</h5>

        <el-form ref="product" :rules="rules" :model="product" label-width="80px" class="elmain">
            <el-tabs v-model="activeName">

                <el-tab-pane label="通用信息" name="first">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="product.name"></el-input>
                    </el-form-item>

                    <el-form-item label="商品分类" prop="category_id">
                        <el-select v-model="product.category_id" placeholder="请选择" filterable multiple>
                            <el-option-group v-for="category in categories" :key="category.id" :label="category.name">
                                <el-option v-for="item in category.children" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-option-group>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="单价" prop="price">
                        <el-input-number v-model="product.price" :min="1" label="描述文字"></el-input-number>
                    </el-form-item>

                    <el-form-item label="库存" prop="stock">
                        <el-input v-model="product.stock"></el-input>
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

                    <el-form-item label="商品描述" prop="description">
                        <el-input type="textarea" v-model="product.description"></el-input>
                    </el-form-item>

                    <el-form-item label="是否上架">
                        <el-switch v-model="product.is_onsale"></el-switch>
                    </el-form-item>

                    <el-form-item label="加入推荐" prop="sort_order">
                        <el-checkbox v-model="product.is_top">置顶</el-checkbox>
                        <el-checkbox v-model="product.is_recommend">推荐</el-checkbox>
                        <el-checkbox v-model="product.is_hot">热销</el-checkbox>
                        <el-checkbox v-model="product.is_new">新品</el-checkbox>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="商品介绍" name="second">
                    <el-form-item label="商品介绍">
                        <quill-editor v-model="product.content" :options="editorOption"></quill-editor>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="商品相册" name="third">
                    <el-form-item label="商品相册">
                        <el-upload
                            class="upload-demo"
                            drag
                            multiple
                            action="/admin/photo"
                            :file-list="fileList2"
                            list-type="picture"
                            name="file"
                            :on-preview="handlePreview"
                            :on-success="handleUploadGalleriesSuccess"
                            :on-remove="handleGalleriesRemove"
                            :before-upload="beforeUpload">

                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </el-tab-pane>

            </el-tabs>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('product')">修改</el-button>
                <router-link :to="{name: 'Products'}">
                    <el-button>取消</el-button>
                </router-link>
            </el-form-item>
        </el-form>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>


    </div>

</template>

<script>
    import 'quill/dist/quill.core.css'                           //适用于VUE的富文本编辑器的引用
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import {quillEditor} from 'vue-quill-editor'

    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                product: {},
                fileList: [],
                fileList2: [],
                editorOption: {
                    placeholder: '请填写商品介绍信息...'
                },
                activeName: 'first',
                categories: [],
                rules: {
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
                    ],
                    description: [
                        {min: 0, max: 255, message: '不能超过255个字符', trigger: 'blur'}
                    ],
                },
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        created() {
            let id = this.$route.params.id
            axios.get(`/admin/shop/products/${id}`).then(response => {
                let product = response.data.data.product
                this.product = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    stock: product.stock,
                    description: product.description,
                    is_onsale: !!product.is_onsale,
                    is_top: !!product.is_top, // 将数据转换为布尔值
                    is_recommend: !!product.is_recommend,
                    is_hot: !!product.is_hot,
                    is_new: !!product.is_new,
                    content: product.content,
                    image: product.image,
                    galleries: product.product_galleries.map(item => {      //map循环获取img
                        return item.img
                    }),
                    category_id: product.categories.map(item => {
                        return item.id
                    })
                };
                this.fileList = [{name: product.image, url: product.image}]    //缩略图
                this.fileList2 = product.product_galleries.map(item => {          //相册
                    return {name: item.img, url: item.img}
                })
            });


            axios.get(`/admin/shop/categories`).then(response => {
                this.categories = response.data.data.categories
            });

        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put("/admin/shop/products/"+ this.product.id,this.product)

                        this.$message({
                            showClose: true,
                            message: `恭喜你，编辑成功！`,
                            type: 'success'
                        });
                        this.$router.push({name: 'Products'})
                    }
                });
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
                this.product.image ='http://pa5hwvrye.bkt.clouddn.com/'+ response.image
            },
            handleUploadGalleriesSuccess(response, file, fileList) {
                this.product.galleries.push(response.image_url)
            },
            handleRemove(file, fileList) {
                this.product.image = ''
            },
            handleGalleriesRemove(file, fileList) {
                //删除相册逻辑
                let index = this.product.galleries.indexOf(file.url)
                this.product.galleries.splice(index, 1)
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
            },
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
