<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="New-main">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/shop/expresses' }">物流运费</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
        </el-breadcrumb>

        <h5>新增品牌</h5>

        <el-form ref="express" :rules="rules" :model="express" label-width="80px">

            <el-col :span="16">

                <el-form-item label="物流名称" prop="name">
                    <el-input v-model="express.name"></el-input>
                </el-form-item>

                <el-form-item label="快递描述" prop="description">
                    <el-input v-model="express.description"></el-input>
                </el-form-item>

                <el-form-item label="运费" prop="shipping_money">
                    <el-input v-model="express.shipping_money"></el-input>
                </el-form-item>

                <el-form-item label="满额包邮" prop="shipping_free">
                    <el-input v-model="express.shipping_free"></el-input>
                </el-form-item>

                <el-form-item label="排序" prop="sort_order">
                    <el-input v-model.number="express.sort_order"></el-input>
                </el-form-item>

                <el-form-item label="是否可用" prop="is_enable">
                    <el-switch v-model="express.is_enable"></el-switch>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('express')">立即创建</el-button>
                    <router-link :to="{name: 'Expresses'}">
                        <el-button>取消</el-button>
                    </router-link>
                </el-form-item>

            </el-col>

        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                express: {
                    name: '',
                    is_enable: true,
                    sort_order: 99
                },
                rules: {
                    name: [
                        {required: true, message: '请输入物流名称', trigger: 'blur'},
                        {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit(express) {
                this.$refs[express].validate((valid) => {            //验证表单
                    if (valid) {
                        axios.post("http://localhost:8000/admin/shop/expresses", this.express).then(() => {
                            this.$message({
                                showClose: true,
                                message: '恭喜你，新增成功',
                                type: 'success'
                            });
                            this.$router.push({name: 'Expresses'})
                        })
                    }
                })
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

</style>
