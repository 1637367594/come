<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20">
            <el-col :span="3">
                <el-input v-model="customer.nickname" placeholder="昵称"></el-input>
            </el-col>
            <el-col :span="3">
        <el-input v-model="customer.openid" placeholder="openid"></el-input>
            </el-col>
            <el-col :span="3" >
                <el-select v-model="customer.sex" placeholder="性别">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
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
            <el-col :span="1">
                <el-button type="primary" icon="el-icon-search" @click="dj" >搜索</el-button>
            </el-col>
        </el-row>
        <template>
            <el-table
                    :data="tableData">
                <el-table-column
                        label="排序"
                        width="100">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column
                        label="缩略图"
                        width="200">
                    <template slot-scope="scope">
                    <img  :src="scope.row.headimgurl" alt="" style="height: 60px">
                </template>

                </el-table-column>
                <el-table-column
                        label="昵称"
                        width="200">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="openid"
                        width="200">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.openid}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="性别"
                        width="100">
                    <template slot-scope="scope">
                        {{scope.row.sex | changeCheck}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="关注时间"
                        width="200">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
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
                tableData:[{
                }],
                options: [{
                    value: '1',
                    label: '男'
                }, {
                    value: '2',
                    label: '女'
                }],
                customer:{
                    sex:'',
                    openid:'',
                    created_at:[],
                    nickname:'',
                },
                page:{
                    total:0,
                    per_page:0,
                    current_page:1
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
            axios.get("http://localhost:8000/admin/shop/customers").then(res=>{
                console.log(res)
                this.tableData=res.data.data.customers.data
            });
            axios.get(`http://localhost:8000/admin/shop/customers?page=${this.page.current_page}`).then(res=>{
                console.log(res)
                this.page = {
                    total:res.data.data.customers.total,
                    per_page:res.data.data.customers.per_page,
                    current_page:res.data.data.customers.current_page
                }

            })
        },
        filters: {
            changeCheck: function (value) {
                return value==1? "男" : "女"
            }
        },
        methods: {
            init(){
                axios.get("http://localhost:8000/admin/shop/customers").then(res=> {
                    console.log(res)
                    this.tableData = res.data.data.customers.data
                })
            },
            dj(){
                axios.get(`http://localhost:8000/admin/shop/customers?page=${this.page.current_page}
                &nickname=${this.customer.nickname}
                &openid=${this.customer.openid}
                &sex=${this.customer.sex}
                &created_at=${this.customer.created_at}`).then(res=>{
                    console.log(this.customer.created_at)
                    let customers = res.data.data.customers.data
                    this.tableData = customers
                 })
            },
            paging(){
                axios.get(`http://localhost:8000/admin/shop/customers?page=${this.page.current_page}`).then(res=>{
                    this.tableData = res.data.data.customers.data;
                    console.log(tableData)
                    this.page = {
                        total:res.data.data.customers.total,
                        per_page:res.data.data.customers.per_page,
                        current_page:res.data.data.customers.current_page
                    }

                })
            },
            handleCurrentChange(val){
                console.log(`当前页:${val}`);
                this.page.current_page=val;
                this.paging();
            }
        }
    }
</script>
<style>
    .el-main{
        line-height:70px;
    }
</style>
