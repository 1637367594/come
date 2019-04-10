<template>
    <div>

        <el-container>

            <el-breadcrumb separator-class="el-icon-arrow-right" class="New-main">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/shop'}">商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品回收站</el-breadcrumb-item>
            </el-breadcrumb>

            <el-header class="header-new">
                <el-button type="success" icon="el-icon-caret-left" @click="handleRestoreChecked">还原</el-button>
                <el-button type="info"  icon="el-icon-delete" @click="handleDeleteChecked">删除</el-button>
            </el-header>

            <el-main class="elmain">
                <el-table ref="multipleTable" :data="products" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">

                    <el-table-column type="selection" width="55"></el-table-column>

                    <el-table-column prop="id" label="id" width="50" fixed></el-table-column>

                    <el-table-column prop="name" label="商品名称"></el-table-column>

                    <el-table-column label="缩略图">
                        <template slot-scope="scope">
                            <img :src="scope.row.image" class="thumb">
                        </template>
                    </el-table-column>

                    <el-table-column label="所属分类">
                        <template slot-scope="scope">
                            {{scope.row.categories | join_categories}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="brand.name" label="品牌" width="100"></el-table-column>
                    <el-table-column prop="price" label="单价"></el-table-column>

                    <el-table-column label="上架日期" width="95">
                        <template slot-scope="scope">{{ scope.row.created_at }} </template>
                    </el-table-column>

                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">

                            <el-button size="mini" type="success" @click="handleRestore(scope.$index, scope.row)">
                                    还原
                                </el-button>

                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-main>

            <el-footer>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="page.total"
                    :page-size="page.pageSize"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </el-footer>

        </el-container>
    </div>
</template>

<script>
    export default {
        data() {

            return {
                categories: [],
                products: [],
                page: {
                    total: 0,
                    pageSize: 0,
                    current_page: 1
                },
                checked_id: []
            }
        },

        created() {
            this.init()
            axios.get(`/admin/shop/categories`).then(response => {
                this.categories = response.data.data.categories
            })
        },
        filters: {
            join_categories: function (value) {
                let categories = value.map((item) => {
                    return item.name
                })
                return categories.join(', ')
            }
        },
        methods: {
            init() {
                axios.get(`/admin/shop/products/trash?page=${this.page.current_page}`).then(response => {
                    let products = response.data.data.products
                    console.log(response.data.data)
                    this.products = products.data
                    this.page = {
                        total: products.total,
                        pageSize: products.per_page,
                        current_page: products.current_page
                    }
                })
            },
            handleCurrentChange(val) {
                this.page.current_page = val
                this.init()
            },

            //还原单条
            handleRestore(index, row) {
                axios.get(`/admin/shop/products/${row.id}/restore`).then(() => {
                    this.products.splice(index, 1)
                    this.$message({
                        type: 'success',
                        message: '还原成功!'
                    })
                });

            },

            //删除单条
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该品牌, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete(`/admin/shop/products/${row.id}/force_destroy`).then(() => {
                        this.products.splice(index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    });
                })
            },


            //多选框
            handleSelectionChange(val) {
                console.log(val)

                this.checked_id = val.map(item => {
                    return item.id
                });
            },

            //还原多条
            handleRestoreChecked() {
                if (this.checked_id.length == 0) {
                    this.$message({
                        type: 'error',
                        message: '请先选择一条记录!'
                    })
                    return;
                }
                axios.post(`/admin/shop/products/restore_checked`, {checked_id: this.checked_id}).then(() => {
                    this.init()
                    this.$message({
                        type: 'success',
                        message: '还原成功!'
                    })
                });
            },


            //删除多条
            handleDeleteChecked() {
                if (this.checked_id.length == 0) {
                    this.$message({
                        type: 'error',
                        message: '请先选择一条记录!'
                    })
                    return;
                }
                axios.post(`/admin/shop/products/force_destroy_checked`, {checked_id: this.checked_id}).then(() => {
                    this.init()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                });
            },
        }
    }
</script>

<style scoped>
    .New-main {
        margin: 30px 0 10px 16px;
    }

    .header-new {
        text-align: left;
        padding: 0px 0 0px 15px;
        background-color: #fff;
    }

    .thumb {
        max-height: 60px;
        width: 100%
    }

    .elmain {
        line-height: 0px;
    }

    .demo-form-inline {
        line-height: 0px;
        text-align: left;
        /*padding-left: 30px;*/
        padding-top: 20px;
    }

    .category_width {
        width: 180px;
    }



    .el-table th div, .el-table th>.cell{
        text-align: center;
    }

    .el-table th>.cell{
        text-align: center;
    }
</style>
