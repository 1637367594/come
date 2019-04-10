<template>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="通用信息" name="first">
            <template>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                    <el-row :gutter="20">
                        <el-col :span="18"><div class="grid-content bg-purple"> <el-form-item label="品牌名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item></div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="商品分类" prop="category_id">
                            <el-select v-model="ruleForm.category_id" placeholder="请选择分类" filterable multiple>
                                <el-option-group v-for="category in categories" :key="category.id" :label="category.name">
                                    <el-option v-for="item in category.children" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-option-group>
                            </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="18"><div class="grid-content bg-purple"> <el-form-item label="单价" prop="price">
                            <el-input v-model="ruleForm.price"></el-input>
                        </el-form-item></div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="18"><div class="grid-content bg-purple"> <el-form-item label="库存" prop="stock">
                            <el-input v-model="ruleForm.stock"></el-input>
                        </el-form-item></div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="商品图像" prop="headimgurl"><div class="grid-content bg-purple" prop="headimgurl" v-model="ruleForm.headimgurl"> <el-upload
                                class="upload-demo"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple
                                :before-upload="beforeUpload">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload></div></el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="18"><div class="grid-content bg-purple"><el-form-item label="商品描述" prop="sort_order">
                            <el-input v-model="ruleForm.sort_order"></el-input>
                        </el-form-item></div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6"><div class="grid-content bg-purple"> <el-form-item label="是否上架" prop="is_onsale">
                            <el-switch v-model="ruleForm.is_onsale"></el-switch>
                        </el-form-item></div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-form-item label="加入推荐" prop="is_show">
                        <el-col :span="10">
                            <el-radio-group>
                                <el-checkbox :label="0" v-model="ruleForm.is_top">置顶</el-checkbox>
                                <el-checkbox :label="1" v-model="ruleForm.is_recommend">推荐</el-checkbox>
                                <el-checkbox :label="2" v-model="ruleForm.is_hot">热销</el-checkbox>
                                <el-checkbox :label="3" v-model="ruleForm.is_new">新品</el-checkbox>
                            </el-radio-group>
                        </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="18"><div class="grid-content bg-purple"> <el-form-item>
                            <el-button :plain="true"  type="primary" @click="submitForm('ruleForm')"> 立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item></div></el-col>
                    </el-row>

                </el-form>
            </template>

        </el-tab-pane>
        <el-tab-pane label="商品介绍" name="second">
        </el-tab-pane>
        <el-tab-pane label="商品相册" name="third"></el-tab-pane>
    </el-tabs>
</template>
<script>

    export default {
        data() {
            return {
                activeName2: 'first',
                ruleForm: {
                    is_onsale:false,
                    is_top:false,
                    is_recommend:false,
                    is_hot:false,
                    is_new:false
                },
                categories:[],
                rules: {
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入商品单价', trigger: 'blur' },
                    ],
                    stock: [
                        { required: true, message: '请输入商品库存', trigger: 'blur' }
                    ]
                },
            };
        },
        created(){
            axios.get(`http://localhost:8000/admin/shop/categories `).then(res => {
                this.categories = res.data.data.categories
            });
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post(`http://localhost:8000/admin/shop/products`, this.ruleForm).then(res => {
                            console.log(res)
                            this.$message({
                                message: '恭喜你，添加成功',
                                type: 'success'
                            });
                            this.$router.push({name: 'manage'})
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/gif';

                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isPNG && !isGIF) {
                    this.$message.error('上传头像只能是jpg/png/gif 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过2MB！');
                    return false;

                }
            },
        },
    }
</script>
<style>
    .el-main{
        line-height: 15px;
    }
</style>