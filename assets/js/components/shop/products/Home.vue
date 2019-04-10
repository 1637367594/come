<template>
    <div>
        <el-container>

            <el-form :inline="true" :model="product" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="product.name" placeholder="商品名称" ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="product.category_id" placeholder="分类" class="category_width">
                        <el-option-group v-for="category in categories" :key="category.name" :label="category.name">
                            <el-option v-for="item in category.children" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="product.brand_id" placeholder="品牌">
                        <el-option v-for="brand in brands" :key="brand.id" :label="brand.name"  :value="brand.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="checkbox_4">
                    <el-checkbox v-model="product.is_top">置顶</el-checkbox>
                    <el-checkbox v-model="product.is_recommend">推荐</el-checkbox>
                    <el-checkbox v-model="product.is_hot">热销</el-checkbox>
                    <el-checkbox v-model="product.is_new">新品</el-checkbox>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="product.is_onsale" placeholder="上架状态">
                        <el-option label="上架" value="1"></el-option>
                        <el-option label="下架" value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                        v-model="product.created_at"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <router-link :to="{ name: 'ProductsNew'}">
                        <el-button type="success" icon="el-icon-edit">新增</el-button>
                    </router-link>
                </el-form-item>
            </el-form>

            <el-main class="elmain">
                <el-table ref="multipleTable" :data="products" tooltip-effect="dark" style="width: 100%">

                    <el-table-column prop="id" label="id" width="50" fixed></el-table-column>

                    <el-table-column label="缩略图">
                        <template slot-scope="scope">
                            <img :src="'http://images.canon4ever.com/'+scope.row.image" class="thumb">
                        </template>
                    </el-table-column>

                    <el-table-column prop="name" label="商品名称"></el-table-column>

                    <el-table-column label="所属分类">
                        <template slot-scope="scope">
                            {{scope.row.categories | join_categories}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="brand.name" label="品牌"></el-table-column>
                    <el-table-column prop="price" label="单价"></el-table-column>

                    <el-table-column label="上架" width="48px">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_onsale ? 'el-icon-check' : 'el-icon-close'"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="置顶" width="48px">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_top ? 'el-icon-check' : 'el-icon-close'"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="推荐" width="48px">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_recommend ? 'el-icon-check' : 'el-icon-close'"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="热销" width="48px">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_hot ? 'el-icon-check' : 'el-icon-close'"></i>
                        </template>
                    </el-table-column>

                    <el-table-column label="新品" width="48px">
                        <template slot-scope="scope">
                            <i @click="reverse(scope.row.is_new)" :class="scope.row.is_new ? 'el-icon-check' : 'el-icon-close'"></i>
                        </template>
                    </el-table-column>

                    <el-table-column label="库存">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.stock" @change="changeStock(scope.row.id,scope.row.stock)" size="small" ></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="上架日期">
                        <template slot-scope="scope">{{ scope.row.created_at | edit_date}}</template>
                    </el-table-column>

                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">

                            <router-link :to="{ name: 'ProductsEdit', params:{id: scope.row.id}}">
                                <el-button size="mini" type="success">
                                    编辑
                                </el-button>
                            </router-link>


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
                brands:[],
                product: {
                    name: '',
                    category_id: '',
                    brand_id: '',
                    is_top: false,
                    is_new: false,
                    is_hot: false,
                    is_recommend: false,
                    is_onsale: '',
                    created_at: ''
                },
                products: [],
                page: {
                    total: 0,
                    pageSize: 0,
                    current_page: 1
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                        {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }]
                },
            }
        },

        created() {
            this.init()
            axios.get(`/admin/shop/categories`).then(response => {
                this.categories = response.data.data.categories
            }),
                axios.get(`/admin/shop/brands`).then(response => {
                this.brands = response.data.data.brands.data
                // console.log(response.data.data.brands.data)
            })
        },
        filters: {
            join_categories: function (value) {
                let categories = value.map((item) => {
                    return item.name
                })
                return categories.join(',')
            },
            edit_date:function (value) {
                return value.substr(0,10)
            }
        },
        methods: {
            init() {
                let created_at =this.product.created_at =null ?'':this.product.created_at
                axios.get(`/admin/shop/products?page=${this.page.current_page}
					&name=${this.product.name}
					&category_id=${this.product.category_id}
					&brand_id=${this.product.brand_id}
					&is_hot=${this.product.is_hot}
					&is_new=${this.product.is_new}
					&is_recommend=${this.product.is_recommend}
					&is_top=${this.product.is_top}
					&is_onsale=${this.product.is_onsale}
					&created_at=${created_at}`).then(response => {
					    console.log(response)
                    let products = response.data.data.products
                    this.products = products.data
                    this.page = {
                        total: products.total,
                        pageSize: products.per_page,
                        current_page: products.current_page
                    }
                })
            },
            reverse(xxx){
                console.log(xxx)
                this.product.is_new = !(!!xxx)
            },
            handleCurrentChange(val) {
                this.page.current_page = val
                this.init()
            },
            handleEdit(index, row) {
                this.$router.push({name: 'ProductEdit', params: {id: row.id}})
            },

            handleDelete(index, row) {
                this.$confirm('将商品删除到回收站, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete(`http://localhost:8000/admin/shop/products/${row.id}`).then((response) => {
                        if (response.data.success == false) {
                            this.$message({
                                type: 'error',
                                message: response.data.msg
                            })
                            return;
                        }
                        this.products.splice(index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    });
                })
            },
            changeStock(id, stock) {
                console.log(id)
                axios.patch(`/admin/shop/products/change_stock`, {id: id, stock: stock}).then((response) => {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                });
            },
            onSubmit() {
                this.init()
            }
        }
    }
</script>

<style scoped>
    .header-new {
        text-align: left;
        padding: 20px 0 50px 30px;
        background-color: #fff;
    }

    .thumb {
        max-height: 60px;
        width: 100%
    }


  .elmain{
      line-height: 0px;
  }

    .demo-form-inline{
        line-height: 0px;
        text-align: left;
        /*padding-left: 30px;*/
        padding-top:20px;
    }
    .category_width{
        width:180px;
    }
    .el-checkbox {
        margin-left: 12px;
    }

    .el-form-item {
        margin-bottom: 0px;
    }
</style>
