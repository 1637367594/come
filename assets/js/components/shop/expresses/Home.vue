<template>
    <div>

        <el-container>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="New-main">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/shop'}">商城管理</el-breadcrumb-item>
                <el-breadcrumb-item>物流运费</el-breadcrumb-item>
            </el-breadcrumb>

            <el-header class="header-new">
                <router-link :to="{name:'ExpressesNew'}">
                <el-button type="success" icon="el-icon-caret-left">新增</el-button>
                </router-link>
            </el-header>

            <el-main class="table_main">
                <el-table :data="expresses" tooltip-effect="dark" style="width: 100%"
                          @selection-change="handleSelectionChange">

                    <el-table-column prop="id" label="编号" width="80"></el-table-column>

                    <el-table-column prop="name" label="物流名称" width="150"></el-table-column>

                    <el-table-column prop="description" label="配送方式描述" width="250"></el-table-column>

                    <el-table-column prop="shipping_money" label="运费" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="shipping_free" label="满额包邮" show-overflow-tooltip></el-table-column>

                    <el-table-column prop="is_enable" label="是否可用">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_enable ? 'el-icon-check' : 'el-icon-close'"
                               @click="changeAttr(scope.row, 'is_enable') "></i>
                        </template>
                    </el-table-column>

                    <el-table-column prop="sort_order" label="排序" width="80"></el-table-column>

                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
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
                expresses: [],
                page: {
                    total: 0,
                    pageSize: 0,
                    current_page: 1
                }
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                axios.get(`http://localhost:8000/admin/shop/expresses?page=${this.page.current_page}`).then(response => {
                    let expresses = response.data.data.expresses
                    this.expresses= expresses.data
                    this.page = {
                        total: expresses.total,
                        pageSize: expresses.per_page,
                        current_page: expresses.current_page
                    }
                })
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            /**
             *  分页控件
             *  **/

            handleCurrentChange(val) {
                this.page.current_page = val
                this.init()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            /**
             *  编辑传参
             *  *  **/

            handleEdit(index, row) {
                this.$router.push({
                    name: 'ExpressesEdit',
                    params: {
                        id: row.id
                    }
                });

                /**
                 *  删除
                 *  *  **/
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete(`http://localhost:8000/admin/shop/expresses/${row.id}`).then(() => {
                        this.expresses.splice(index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                })
            },

            /**
             *  是否显示
             *  *  **/
            changeAttr(row, attr) {
                axios.patch(`http://localhost:8000/admin/expresses/is_something`, {
                    id: row.id,
                    attr: attr
                }).then(response => {
                    row.is_enable = !row.is_enable
                })
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
    .el-main {
        line-height: 40px;
    }

    .el-pagination {
        margin-top: 30px;
    }

    .table_main > .el-table {
        text-align: center;
    }

    .thumb {
        max-width: 50px;
    }

    i{
        cursor: pointer;
    }

    .el-icon-check{
        color:green;
        font-weight: bold;
    }

    .el-icon-close{
        color:red;
        font-weight: bold;
    }
</style>
