<template>
    <div>
        <el-container>

            <el-breadcrumb separator-class="el-icon-arrow-right" class="New-main">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商城管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/shop/customer' }">会员管理</el-breadcrumb-item>
            </el-breadcrumb>

            <el-form :inline="true" :model="customer" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="customer.nickname" placeholder="昵称"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="customer.openid" placeholder="openid"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-select v-model="customer.sex" placeholder="性别">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                        v-model="customer.created_at"
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
                </el-form-item>
            </el-form>

            <el-main class="has-gutter">
                <el-table ref="multipleTable" :data="customers" tooltip-effect="dark" style="width: 100%">

                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column label="缩略图">
                        <template slot-scope="scope">
                            <img :src="scope.row.headimgurl" class="thumb">
                        </template>
                    </el-table-column>

                    <el-table-column prop="nickname" label="昵称"></el-table-column>
                    <el-table-column prop="openid" label="openid"></el-table-column>

                    <el-table-column label="性别">
                        <template slot-scope="scope">
                            {{scope.row.sex == '1' ? '男' : '女'}}
                        </template>
                    </el-table-column>

                    <el-table-column label="关注时间	">
                        <template slot-scope="scope">{{ scope.row.created_at }}</template>
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
                pickerOptions: {
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
                },
                customers: [],
                page: {
                    total: 0,
                    pageSize: 0,
                    current_page: 1
                },
                customer: {
                    sex:'',
                    created_at:'',
                    openid:'',
                    nickname:''
                }
            }
        },

        created() {
            this.init()
        },
        methods: {
            init() {
                axios.get(`/admin/shop/customers?page=${this.page.current_page}&nickname=${this.customer.nickname}
				&openid=${this.customer.openid}
					&sex=${this.customer.sex}
					&created_at=${this.customer.created_at}`).then(response => {
                    let customers = response.data.data.customers
                    this.customers = customers.data
                    this.page = {
                        total: customers.total,
                        pageSize: customers.per_page,
                        current_page: customers.current_page
                    }
                })
            },
            handleCurrentChange(val) {
                this.page.current_page = val
                this.init()
            },
            onSubmit() {
                this.init()
            }
        }
    }
</script>

<style scoped>

    .New-main {
        margin: 30px 0 20px 16px;
    }

    .thumb {
        max-height: 60px;
        -webkit-border-radius: 30px;
        -moz-border-radius: 30px;
        border-radius: 30px;
    }

    .el-header {
        text-align: left;
    }

    .demo-form-inline {
        line-height: 0;
    }

    .has-gutter{
        line-height: 0px;
    }

    .el-footer {
        padding: 0;
        margin-top: 30px;
        text-align: center;
    }

    .line {
        text-align: center;
    }
</style>
