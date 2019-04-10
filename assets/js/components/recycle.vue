<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/manage' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品回收站</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary"  style="background-color: #2ca02c" @click="restore"><i class="el-icon-caret-left">还原</i></el-button>
       <el-button type="primary" icon="el-icon-delete" @click="remove" style="background-color: #2a2a2a">删除</el-button>
        <template>
            <el-table
                    :data="tableData"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="ID"
                        width="120">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column
                        label="商品名称"
                        width="120">
                    <template slot-scope="scope">
                        <span >{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="缩略图"
                        width="120">
                    <template slot-scope="scope">
                        <img width="100px" :src="'http://images.canon4ever.com/' + scope.row.image">
                    </template>

                </el-table-column>
                <el-table-column
                        label="所属分类"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.categories | join_categories}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="品牌"
                        width="120">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column
                        label="单价"
                        width="120">
                    <template slot-scope="scope">
                        <span >{{ scope.row.price }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="上架日期"
                        width="150">
                    <template slot-scope="scope">
                        {{ scope.row.created_at | edit_data}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handlerestore(scope.$index, scope.row)">还原</el-button>
                        <!--<el-button type="text" @click="open2">-->
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <!--</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: {},
                multipleSelection:[],
                checked_id:''
            }
        },
        created(){
            axios.get(`http://localhost:8000/admin/shop/products/trash?page=1 `).then(res => {
                // console.log(res)
                this.tableData= res.data.data.products.data
            });
        },
        filters: {
            join_categories:function (value) {
                let categories = value.map((item)=>{
                    return item.name
                })
                return categories.join(',')
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.checked_id = this.multipleSelection.map(item=>{
                    return item.id
                })
            },
            handleDelete(index,row) {
                axios.delete(`http://localhost:8000/admin/shop/products/${row.id}/force_destroy`).then(res=>{
                    axios.get(`http://localhost:8000/admin/shop/products/trash?page=1 `).then(res => {
                        this.tableData= res.data.data.products.data
                    });
                })
            },
            handlerestore(index,row){
                axios.get(`http://localhost:8000/admin/shop/products/${row.id}/restore`).then(res => {
                    axios.get(`http://localhost:8000/admin/shop/products/trash?page=1 `).then(res => {
                        this.tableData= res.data.data.products.data
                    });
                })
            },
            // open2() {
            //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         this.$message({
            //             type: 'success',
            //             message: '删除成功!'
            //         });
            //     }).catch(() => {
            //         this.$message({
            //             type: 'info',
            //             message: '已取消删除'
            //         });
            //     });
            // },
            restore(){
                axios.post(`http://localhost:8000/admin/shop/products/restore_checked`,{checked_id:this.checked_id}).then(res => {
                    axios.get(`http://localhost:8000/admin/shop/products/trash?page=1 `).then(res => {
                        this.tableData= res.data.data.products.data
                    });
                })
            },
            remove(){
                axios.post(`http://localhost:8000/admin/shop/products/force_destroy_checked`,{checked_id:this.checked_id}).then(res => {
                    axios.get(`http://localhost:8000/admin/shop/products/trash?page=1 `).then(res => {
                        this.tableData= res.data.data.products.data
                    });
                })
            }
        }
    }
</script>
<style>
    .el-main{
        text-align:left;
        line-height:70px;
    }
</style>