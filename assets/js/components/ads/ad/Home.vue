<template>
    <div>

        <el-container>
            <el-header>
                <router-link :to="{ name: 'AdsNew'}">
                    <el-button type="success" icon="el-icon-edit">新增</el-button>
                </router-link>
                <el-button type="danger"  icon="el-icon-delete" @click="handleDeleteChecked">删除</el-button>
            </el-header>

            <el-main class="table_main">
                <el-table ref="multipleTable" :data="ads" tooltip-effect="dark" style="width: 100%"
                          @selection-change="handleSelectionChange">

                    <el-table-column type="selection" width="55"></el-table-column>

                    <el-table-column prop="id" label="编号" width="80"></el-table-column>

                    <el-table-column prop="image" label="缩略图" width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.image" class="thumb">
                        </template>
                    </el-table-column>

                    <el-table-column prop="title" label="标题" width="120"></el-table-column>

                    <el-table-column prop="category.name" label="所属栏目" width="120"></el-table-column>
                    <el-table-column prop="description" label="描述信息" show-overflow-tooltip></el-table-column>

                    <el-table-column prop="sort_order" label="排序" width="80"></el-table-column>

                    <el-table-column label="发布日期" width="95">
                      <template slot-scope="scope">{{ scope.row.created_at }} </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <router-link :to="{name: 'AdsEdit', params: {id:scope.row.id}}">
                            <el-button size="mini" >编辑</el-button>
                            </router-link>

                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                axios.get(`http://localhost:8000/admin/ads/ads?page=${this.page.current_page}`).then(response => {
                    let ads= response.data.data.ads
                    console.log(ads.data)
                    this.ads = ads.data
                    this.page = {
                        total: ads.total,
                        pageSize: ads.per_page,
                        current_page: ads.current_page
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
               // console.log(val)
                val.forEach(v=>{
                    this.checked_id.push(v.id)
                });


            },

                /**
                 *  删除
                 *  *  **/

            handleDelete(index, row) {
                this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete(`http://localhost:8000/admin/ads/ads/${row.id}`).then(() => {
                        this.ads.splice(index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                })
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
                axios.post(`/admin/ads/ads/destroy_checked`, {checked_id: this.checked_id}).then(() => {
                    this.init()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                });
            }
        },
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
