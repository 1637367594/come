<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-row :gutter="20">
            <el-col :span="18">
                <el-form-item label="品牌名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple" prop="image" v-model="ruleForm.image">
                    <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 20px">
            <el-col :span="12">
                <el-form-item label="商品分类" prop="parent_id">
                    <el-select v-model="ruleForm.parent_id" placeholder="请选择分类">
                        <el-option label="顶级分类" :value="0" disabled="disabled"></el-option>
                        <el-option
                                v-for="item in category"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="grid-content bg-purple">
                    <el-form-item label="排序" prop="sort_order">
                        <el-input v-model="ruleForm.sort_order"></el-input>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="是否隐藏" prop="is_show">
                        <el-switch v-model="ruleForm.is_show"></el-switch>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="grid-content bg-purple">
                    <el-form-item label="品牌描述" prop="description">
                        <el-input type="textarea" v-model="ruleForm.description"></el-input>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="grid-content bg-purple">
                    <el-form-item>
                        <el-button :plain="true" type="primary" @click="submitForm('ruleForm')"> 添加</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>

    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {},
                category: [],
                rules: {
                    name: [
                        {required: true, message: '请输入品牌名称', trigger: 'blur'},
                        {min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请输入品牌描述', trigger: 'blur'}
                    ],
                    parent_id:[
                        {required: false, message: '请选择商品分类', trigger: ''},
                    ]
                }
            }
        },
        created() {
            axios.get(`http://localhost:8000/admin/shop/categories`).then(res => {
                this.category = res.data.data.categories
                console.log(this.category)
            })
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post(`http://localhost:8000/admin/shop/categories/`, this.ruleForm).then(res => {
                            this.ruleForm = res.data.data.categories
                            this.$message({
                                message: '恭喜你，添加成功',
                                type: 'success'
                            });
                            this.$router.push({name: 'classify'})
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>
    .el-main {
        line-height: 20px;
    }
</style>