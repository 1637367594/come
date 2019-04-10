<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="2">
                <el-input v-model="customer.name" placeholder="商品名称"></el-input>
            </el-col>
            <el-col :span="4">
                <el-select v-model="customer.category_id" placeholder="请选择分类">
                            <el-option-group v-for="category in categories" :key="category.id" :label="category.name">
                                <el-option v-for="item in category.children" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-option-group>
                </el-select>
            </el-col>
            <el-col :span="2">
                    <el-select v-model="customer.parent_id" placeholder="品牌">
                        <el-option
                                v-for="item in cate"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
            </el-col>
            <el-col :span="6">
            <el-radio-group>
                    <el-checkbox :label="0" v-model="customer.is_top">置顶</el-checkbox>
                    <el-checkbox :label="1" v-model="customer.is_recommend">推荐</el-checkbox>
                    <el-checkbox :label="2" v-model="customer.is_hot">热销</el-checkbox>
                    <el-checkbox :label="3" v-model="customer.is_new">新品</el-checkbox>
            </el-radio-group>
            </el-col>
            <el-col :span="2">
                <el-select v-model="customer.is_onsale" placeholder="上架状态">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="5">
                <el-date-picker
                        v-model="customer.created_at"
                        type="datetimerange"
                        align="right"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-col>
        </el-row>
        <div>
            <router-link to="/manage/new"><el-button type="primary"  style="background-color: #2b542c"><i class="el-icon-edit">新增</i></el-button></router-link>
            <el-button type="primary" icon="el-icon-search" @click="dj">搜索</el-button>
        </div>
        <template>
            <el-table
                    :data="tableData">
                <el-table-column
                        label="ID"
                        width="100">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column
                        label="缩略图"
                        width="100">
                    <template slot-scope="scope">
                        <img width="100px" :src="'http://images.canon4ever.com/' + scope.row.image">
                    </template>

                </el-table-column>
                <el-table-column
                        label="商品名称"
                        width="100">
                    <template slot-scope="scope">
                        <span >{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="所属分类"
                        width="100">
                    <template slot-scope="scope">
                        {{ scope.row.categories | join_categories}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="品牌"
                        width="100">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column
                        label="单价"
                        width="100">
                    <template slot-scope="scope">
                        <span >{{ scope.row.price }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="上架"
                        width="50">
                    <template slot-scope="scope"><i :class="scope.row.is_onsale | changeCheck "></i></template>
                </el-table-column>
                <el-table-column
                        label="置顶"
                        width="50">
                    <template slot-scope="scope"><i :class="scope.row.is_top | changeCheck "></i></template>
                </el-table-column>
                <el-table-column
                        label="推荐"
                        width="50">
                    <template slot-scope="scope"><i :class="scope.row.is_recommend | changeCheck "></i></template>
                </el-table-column>
                <el-table-column
                        label="热销"
                        width="50">
                    <template slot-scope="scope"><i :class="scope.row.is_hot | changeCheck "></i></template>
                </el-table-column>
                <el-table-column
                        label="新品"
                        width="50">
                    <template slot-scope="scope"><i :class="scope.row.is_new | changeCheck "></i></template>
                </el-table-column>
                <el-table-column
                        label="库存"
                        prop="sort_order">
                    <template slot-scope="scope">
                        <el-input style="width: 70px"  v-model="scope.row.stock"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="上架日期"
                        width="120">
                    <template slot-scope="scope">
                        {{ scope.row.created_at | edit_data}}
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
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData:{
                    is_onsale:false,
                    is_top:false,
                    is_recommend:false,
                    is_hot:false,
                    is_new:false
                },
                categories:[],
                cate:[],
                options: [{
                    value: '1',
                    label: '上架'
                }, {
                    value: '0',
                    label: '未上架'
                }],
                customer:{
                    created_at:[],
                    name:'',
                    category_id:''
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },
        created(){
            axios.get("http://localhost:8000/admin/shop/products").then(res=>{
                // console.log(res)
                this.tableData=res.data.data.products.data
            });
            axios.get(`http://localhost:8000/admin/shop/categories `).then(res => {
                // console.log(res)
                    this.categories = res.data.data.categories
            });
            axios.get(`http://localhost:8000/admin/shop/brands`).then(res => {
                // console.log(res)
                this.cate= res.data.data.brands.data
            });
            axios.get("http://localhost:8000/admin/shop/products").then(res=>{
                console.log(res)
                this.cateaaa=res.data.data.products.data.is_onsale
            });
        },
        filters: {
            changeCheck: function (value) {
                return value==1 ? 'el-icon-check' : 'el-icon-close'
            },
            edit_data:function (value) {
                return value.substr(0,10)
            },
            join_categories:function (value) {
                let categories = value.map((item)=>{
                    return item.name
                })
                return categories.join(',')
            }
        },
        methods: {
            dj(){
                axios.get(`http://localhost:8000/admin/shop/products?name=${this. customer.name}
                &is_onsale=${this.customer.is_onsale}
                &is_recommend=${this.customer.is_recommend}
                &is_top=${this.customer.is_top}
                &is_hot=${this.customer.is_hot}
                &is_new=${this.customer.is_new}
                &category_id=${this.customer.category_id}
                &created_at=${this. customer.created_at}`).then(res=>{
                    let products = res.data.data.products.data
                    this.tableData = products
                })
            },
            handleEdit(index,row) {
                // console.log(row);
                this.$router.push({name:'new6',params:{id:row.id}});
            },
            handleDelete(index,row) {
                axios.delete(`http://localhost:8000/admin/shop/products/${row.id}`).then(res=>{
                    axios.get('http://localhost:8000/admin/shop/products').then(res=>{
                        this.tableData=res.data.data.products.data;
                    })
                })
            },
        }
    }
</script>
<style>
    .el-icon-check{
        color: green;
        font-weight: 700;
    }
    .el-icon-close{
        color:red;
        font-weight:700;
    }
    .el-main{
        text-align:left;
        line-height:50px;
    }
</style>
