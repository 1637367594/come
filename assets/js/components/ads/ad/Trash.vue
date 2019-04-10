<template>
    <div>

        <el-container>

            <el-breadcrumb separator-class="el-icon-arrow-right" class="New-main">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/ads'}">商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品回收站</el-breadcrumb-item>
            </el-breadcrumb>

            <el-header class="header-new">
                <el-button type="success" icon="el-icon-caret-left" @click="handleRestoreChecked">还原</el-button>
                <el-button type="info"  icon="el-icon-delete" @click="handleDeleteChecked">删除</el-button>
            </el-header>

            <el-main class="elmain">


                <el-table ref="multipleTable" :data="ads" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">

                    <el-table-column type="selection" width="55"></el-table-column>

                    <el-table-column prop="id" label="编号" width="50" fixed></el-table-column>



                    <el-table-column prop="image" label="缩略图" width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.image" class="thumb">
                        </template>
                    </el-table-column>

                    <el-table-column prop="title" label="商品名称"></el-table-column>
                    <el-table-column prop="category.name" label="所属栏目" width="120"></el-table-column>
                    <el-table-column prop="description" label="描述信息" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="sort_order" label="排序" width="80"></el-table-column>
                    <el-table-column label="删除日期" width="95">
                        <template slot-scope="scope">{{ scope.row.deleted_at }} </template>
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
                ads: [],
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
        },
        methods: {
            init() {
                axios.get(`/admin/ads/ads/trash?page=${this.page.current_page}`).then(response => {
                    let ads = response.data.data.ads
                    this.ads = ads.data
                    this.page = {
                        total: ads.total,
                        pageSize: ads.per_page,
                        current_page: ads.current_page
                    }
                })
            },
            handleCurrentChange(val) {
                this.page.current_page = val
                this.init()
            },

            //还原单条
            handleRestore(index, row) {
                axios.get(`/admin/ads/ads/${row.id}/restore`).then(() => {
                    this.ads.splice(index, 1)
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
                    axios.delete(`/admin/ads/ads/${row.id}/force_destroy`).then(() => {
                        this.ads.splice(index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    });
                })
            },


            //多选框
            handleSelectionChange(val) {
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
                axios.post(`/admin/ads/ads/restore_checked`, {checked_id: this.checked_id}).then(() => {
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
                axios.post(`/admin/ads/ads/force_destroy_checked`, {checked_id: this.checked_id}).then(() => {
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
