<template>
    <div>

        <el-header class="header-new">
            <router-link :to="{ name: 'CategoriesNew'}">
                <el-button type="success" icon="el-icon-edit">新增</el-button>
            </router-link>



        </el-header>


        <el-table :data="categories" style="width: 100%" row-key="id">


            <el-table-column label="商品 ID" prop="id"></el-table-column>

            <el-table-column label="缩略图"  prop="image">
                <template slot-scope="scope">
                    <img :src="scope.row.image" class="thumb">
                </template>
            </el-table-column>

            <el-table-column label="品牌分类" prop="name"></el-table-column>

            <el-table-column label="是否显示">
            <template slot-scope="scope" >
                <i :class="scope.row.is_show ? 'el-icon-check' : 'el-icon-close'" @click="changeAttr(scope.row, 'is_show') "></i>
            </template>
            </el-table-column>

            <el-table-column label="排序">
                <template slot-scope="scope" >
                    <el-input class="elinput" v-model="scope.row.sort_order"  size="small" @change="sort_order(scope.row.id, scope.row.sort_order)"></el-input>
                </template>
            </el-table-column>

            <el-table-column label="描述" prop="description"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>


    import { mapState, mapActions } from 'vuex'

    export default {
        data() {
            return {

            }
        },
        created() {
            this.$store.dispatch('adCategories/getAllCategories')
        },
        computed: {
            ...mapState({
                categories: state => state.adCategories.categories})

        }, methods: {
            /**
             *  编辑传参
             *  *  **/
            handleEdit(index, row) {
                this.$router.push({name: 'CategoriesEdit', params: {id: row.id}});

            },

            /**
             *  删除
             *  *  **/
            handleDelete(index, row, parent = '') {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        axios.delete(`http://localhost:8000/admin/shop/categories/${row.id}`).then((response) => {


                            console.log(response.data.success)

                          if(!response.data.success){
                              this.$message.error(response.data.msg);
                              return
                          }
                            parent = parent || this.categories
                            parent.splice(index, 1)

                            this.categories.splice(index, 1)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })
                    })
            },

            /**
             *  展开显示
             *  *  **/


            /**
             *  是否显示
             *  *  **/
            changeAttr(row, attr){
                axios.patch(`http://localhost:8000/admin/shop/categories/is_something`, {id: row.id, attr: attr}).then(response => {
                    row.is_show = !row.is_show
                })
            },

            /**
             *  排序
             *  *  **/
            sort_order(id, sort_order_value){
                axios.patch(`http://localhost:8000/admin/shop/categories/sort_order`, {id: id, sort_order: sort_order_value}).then(response => {
                    this.categories = response.data.data.categories
                }).catch( (error) => {
                    if (error.response && error.response.status=="422") {
                        this.$message.error("填写的排序不正确！必须是0~99的数字！")
                    }
                });
            },
        }
    }
</script>


<style>

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
        max-width: 100px;
    }

    .el-table__expanded-cell[class*=cell] {
        padding: 0 0 0 48px;
        border-bottom: none;
    }

    .header-new {
        text-align: left;
        padding: 20px 0 50px 30px;
        background-color: #fff;
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

    .elinput{
        width:50px
    }

</style>
