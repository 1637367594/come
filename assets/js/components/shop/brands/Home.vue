<template>
    <div>

        <el-container>
            <el-header>
                <router-link :to="{ name: 'BrandsNew'}">
                    <el-button type="success" icon="el-icon-edit">新增</el-button>
                </router-link>
            </el-header>

            <el-main class="table_main">
                <el-table :data="brands" tooltip-effect="dark" style="width: 100%"
                          @selection-change="handleSelectionChange">
                    <el-table-column prop="id" label="品牌ID" width="80"></el-table-column>

                    <el-table-column label="缩略图" width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.image" class="thumb">
                        </template>
                    </el-table-column>

                    <el-table-column prop="name" label="品牌名称" width="120"></el-table-column>

                    <el-table-column prop="url" label="品牌网址" width="200"></el-table-column>
                    <el-table-column prop="description" label="描述信息" show-overflow-tooltip></el-table-column>

                    <el-table-column prop="sort_order" label="排序" width="80"></el-table-column>

                    <el-table-column prop="is_show" label="是否显示">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_show | checkOrClose"></i>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                                编辑
                            </el-button>

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
                brands: [],
                page: {
                    total: 0,
                    pageSize: 0,
                    current_page: 1
                }
            }
        },
        filters: {
            checkOrClose: function (value) {
                return value ? 'el-icon-check' : 'el-icon-close'
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                axios.get(`http://localhost:8000/admin/shop/brands?page=${this.page.current_page}`).then(response => {
                    let res = response.data.data.brands
                    console.log(res)
                    this.brands = res.data
                    this.page = {
                        total: res.total,
                        pageSize: res.per_page,
                        current_page: res.current_page
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
                console.log(val)
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
                console.log(row.id)
                this.$router.push({name: 'BrandsEdit', params: {id: row.id}});
            },

        /**
         *  删除
         *  *  **/
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete(`http://localhost:8000/admin/shop/brands/${row.id}`).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.brands.splice(index,1)
                })
            })

        },


        /**
         *  是否显示
         *  *  **/
        changeAttr(row, attr) {
            axios.patch(`http://localhost:8000/admin/brands/is_something`, {
                id: row.id,
                attr: attr
            }).then(response => {
                row.is_show = !row.is_show
            })
        },
    }
    }
</script>


<style scoped>
    .el-header {
        text-align: left;
        padding: 20px 0 50px 30px;
        background-color: #fff;
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

    i {
        cursor: pointer;
    }

    .el-icon-check {
        color: green;
        font-weight: bold;
    }

    .el-icon-close {
        color: red;
        font-weight: bold;
    }
</style>
