<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-purple">
                <router-link to="/hhh/new"><el-button type="primary" icon="el-icon-edit" >新增</el-button></router-link>
            </div></el-col>
        </el-row>

        <template>
            <el-table
                    :data="tableData">
                <el-table-column
                        label="品牌ID"
                        width="150">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="缩略图"
                        width="150">
                    <template slot-scope="scope">
                    <img  :src="scope.row.image" alt="" style="height: 60px">
                </template>

                </el-table-column>
                <el-table-column
                        label="品牌名称"
                        width="150">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="品牌网址"
                        width="150">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.url}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="描述信息"
                        width="150">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="排序"
                        width="150">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.sort_order }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="是否显示"
                        width="150">
                    <template slot-scope="scope">
                        <i :class="scope.row.is_show | changeCheck "></i>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                               size="mini"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.per_page"
                @current-change="handleCurrentChange">
        </el-pagination>


    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [{

                }],
                page:{
                    total:0,
                    per_page:0,
                    current_page:1
                }
            }
        },
        created(){
            axios.get("http://localhost:8000/admin/shop/brands").then(res=>{
                this.tableData=res.data.data.brands.data;
                console.log(tableData)

            })
            axios.get(`http://localhost:8000/admin/shop/brands?page=${this.page.current_page}`).then(res=>{
                console.log(res)
                this.page = {
                    total:res.data.data.brands.total,
                    per_page:res.data.data.brands.per_page,
                    current_page:res.data.data.brands.current_page
                }

            })
        },
        filters:{
            changeCheck:function (value) {
                return value ? 'el-icon-check' : 'el-icon-close'
            }
        },
        methods: {
            init(){
                axios.get(`http://localhost:8000/admin/shop/brands?page=${this.page.current_page}`).then(res=>{
                    this.tableData=res.data.data.brands.data;
                    console.log(tableData)
                    this.page = {
                        total:res.data.data.brands.total,
                        per_page:res.data.data.brands.per_page,
                        current_page:res.data.data.brands.current_page
                    }

                })
            },
            handleEdit(index, row) {
                console.log(row);
                this.$router.push({name:'new2',params:{id:row.id}})
            },
            handleDelete(index,row) {
                axios.delete(`http://localhost:8000/admin/shop/brands/${row.id}`).then(res=>{
                    axios.get('http://localhost:8000/admin/shop/brands').then(res=>{
                        this.tableData=res.data.data.brands.data;
                    })
                })
            },
            handleCurrentChange(val){
                console.log(`当前页:${val}`);
                this.page.current_page=val;
                this.init();
            }
        }
    }
</script>
<style>
    .el-main{
        line-height: 70px;
    }
    .el-table--fit{
        text-align: center;
    }
    .el-pagination{
        text-align: center;
    }
    .el-icon-check{
        color: green;
        font-weight: 700;
    }
    .el-icon-close{
        color:red;
        font-weight:700;
    }
</style>