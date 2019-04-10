<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20">
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <router-link to="/classify/new4">
                        <el-button type="success"><i class="el-icon-edit"></i>新增</el-button>
                    </router-link>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple">
                    <el-button type="info"
                    icon="el-icon-d-caret"
                    @click="showChildren">{{expand_word}}</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table
                :data="tableData"
                style="width: 100%"
                row-key="id" :expand-row-keys="expand">
            <el-table-column type="expand">
                <template slot-scope="props">
                <el-table
                        :data="props.row.children"
                        style="width: 100%"
                        :show-header="false">
                    <el-table-column
                            prop="id">
                    </el-table-column>
                    <el-table-column
                            prop="image">
                        <template slot-scope="scope">
                            <img width="100px" :src="'http://images.canon4ever.com/' + scope.row.image">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            prop="is_show">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_show | changeCheck"></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="sort_order">
                        <template slot-scope="scope">
                            <el-input style="width: 50px" @change="sort_order(scope.row.id,scope.row.sort_order)" v-model="scope.row.sort_order"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="description">
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </template>
            </el-table-column>


            <el-table-column
                    label="商品 ID"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="缩略图"
                    prop="image">
                <template slot-scope="scope">
                    <img  :src="scope.row.image" alt="" style="height: 60px">
                </template>
            </el-table-column>
            <el-table-column
                    label="品牌分类"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="是否显示"
                    prop="is_show">
                <template slot-scope="scope">
                    <i :class="scope.row.is_show | changeCheck"></i>
                </template>
            </el-table-column>
            <el-table-column
                    label="排序"
                    prop="sort_order">
                <template slot-scope="scope">
                    <el-input style="width: 50px" @change="sort_order(scope.row.id,scope.row.sort_order)" v-model="scope.row.sort_order"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="描述信息"
                    prop="description">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style>
    .el-main {
        line-height: 50px;
    }

    .el-pagination {
        margin-top: 50px;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .el-icon-check {
        color: green;
        font-weight: bold;
    }

    .el-icon-close {
        color: red;
        font-weight: bold;
    }

    .el-table .cell {
        text-align: center;
    }
</style>

<script>
    export default {
        data() {
            return {
                tableData: [],
                expand:[],
            }
        },
        created() {
            axios.get("http://localhost:8000/admin/shop/categories").then(res => {
                console.log(res)
                this.tableData = res.data.data.categories
            })
        },
        //过滤
        filters: {
            changeCheck: function (value) {
                return value ? 'el-icon-check' : 'el-icon-close'
            }
        },
        computed:{
            expand_word: function () {
                return this.expand.length==0 ? "展开" : "关闭"
            }
        },
        methods: {
            init(){
                axios.get("http://localhost:8000/admin/shop/categories").then(res => {
                    // console.log(res)
                    this.tableData = res.data.data.categories
                })
            },
            // 编辑
            handleEdit(index,row) {
                // console.log(row);
                this.$router.push({name:'new3',params:{id:row.id}});
            },
            // 删除
            handleDelete(index, row) {
                // console.log(index, row);
                axios.delete(`http://localhost:8000/admin/shop/categories/${row.id}`).then(res=>{
                    axios.get(`http://localhost:8000/admin/shop/categories`).then(res=>{
                        this.tableData = res.data.data.categories
                    })
                })
            },
            //展开关闭
            showChildren(){
                console.log(this.expand.length)
                if (this.expand.length != 0){
                    this.expand = []  //直接清空
                } else {
                    this.expand = this.tableData.map(category =>{
                        return category.id               //map循环查找对应id
                    })
                }
            },
            //排序
            sort_order(id,sort_order){
                axios.patch(`http://localhost:8000/admin/shop/categories/sort_order`,{id:id,sort_order:sort_order}).
                    then(res=>{
                        this.init()
                }).catch((error)=>{
                    console.log(error)
                    if (error.res && error.res.status=="422"){
                        this.$message.error("填写的排序不正确！必须是0-99的数字")
                    }
                })
            }
        },
    }
</script>