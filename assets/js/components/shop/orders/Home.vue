<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="New-main">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/shop/orders' }">订单管理</el-breadcrumb-item>
        </el-breadcrumb>


        <div class="order-list-box">
            <el-card class="box-card uc-order-item" v-for="order in orders" :key="order.id"
                     :class="classGroup[order.status-1]">
                <div class="order-detail">
                    <div class="order-summary">
                        <div class="order-status">{{order.status | orderStatus}}</div>
                    </div>
                    <table class="order-detail-table">
                        <thead>
                        <tr>
                            <th class="col-main">
                                <p class="caption-info">{{order.created_at}}
                                    <span class="sep">|</span>
                                    解决
                                    (<a :href="`tel:${order.address.tel}`">{{order.address.tel}}</a>)
                                    <span class="sep">|</span>
                                    订单号：
                                    <a href="//order.mi.com/user/orderView/1150426350013010">{{order.id}}</a>
                                </p>
                            </th>
                            <th class="col-sub">
                                <p class="caption-price">订单金额：
                                    <span class="num">{{order.total_price}}</span>元
                                </p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="order-items">
                                <ul class="goods-list">

                                    <li v-for="order_product in order.order_products">
                                        <div class="figure figure-thumb">
                                            <a href="#" target="_blank">
                                                <img
                                                    :src="'http://images.canon4ever.com/'+order_product.product.image"
                                                    class="thumb" width="80" height="80"
                                                    :alt="order_product.product.name">
                                            </a>
                                        </div>
                                        <p class="name">
                                            <a href="#" target="_blank">{{order_product.product.name}}</a>
                                        </p>
                                        <p class="price">{{order_product.price}}
                                            元
                                            × {{order_product.num}}</p>
                                    </li>
                                </ul>
                            </td>
                            <td class="order-actions">
                                <router-link :to="{name:'OrderShow',params:{id:order.id}}">
                                    <el-button class="orders-button" type="success">订单详情</el-button>
                                </router-link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </el-card>
        </div>
        <el-footer>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.pageSize"
                @current-change="handleCurrentChange">
            </el-pagination>
        </el-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                classGroup: [
                    'uc-order-item-pay',        //橙
                    'uc-order-item-shipping',   //红
                    'uc-order-item-shipping',   //红
                    'uc-order-item-receiving',   //绿
                    'uc-order-item-finish',],
                orders: [],
                page: {
                    total: 0,
                    pageSize: 0,
                    current_page: 1
                }
            }
        },
        created() {
            this.init()
        },
        filters: {
            orderStatus(value) {
                let status = ['待付款', '待发货', '配货中', '待收货', '交易成功']
                return status[value - 1]
            },
            orderColor(value) {
                switch (value) {
                    case 1:
                        return 'uc-order-item-receiving';   //绿
                        break;
                    case 2:
                        return 'uc-order-item-shipping';    //红
                        break;
                    case 3:
                        return 'uc-order-item-shipping';    //红
                        break;
                    case 4:
                        return 'uc-order-item-pay';         //橙
                        break;
                    case 5:
                        return 'uc-order-item-finish';      //灰
                        break;
                    default:
                        return 'uc-order-item-finish';
                }
            }
        },
        methods: {
            init() {
                axios.get(`/admin/shop/orders?page=${this.page.current_page}`).then(response => {
                    let orders = response.data.data.orders
                    this.orders = orders.data
                    this.page = {
                        total: orders.total,
                        pageSize: orders.per_page,
                        current_page: orders.current_page
                    }
                })
            },
            handleCurrentChange(val) {
                this.page.current_page = val
                this.init()
            }
        }
    }
</script>

<style scoped>

    .New-main {
        margin: 30px 0 20px 16px;
    }

    .box-card {
        border-radius: 5px;
        border: 1px solid #83c44e;
        margin-left: 15px;
        margin-bottom: 20px;
    }

    .order-list-box {
        font-size: 14px;
    }

    .order-list-box .order-list {
        margin: 0;
        padding: 10px 0;
        list-style-type: none;
    }

    .orders-button {
        margin-top: 20px;
    }

    .order-list-box .uc-order-item-pay {
        border-color: #F37B1D;
    }

    .order-list-box .uc-order-item-shipping {
        border-color: #dd514c;
    }

    .uc-order-item-pay .order-status, .uc-order-item-pay .order-desc {
        color: #F37B1D;
    }

    .uc-order-item-shipping .order-status, .uc-order-item-shipping .order-desc {
        color: #dd514c;
    }

    .uc-order-item-receiving .order-status, .uc-order-item-receiving .order-desc {
        color: #83c44e;
    }

    .uc-order-item {
        position: relative;
    }

    .order-list-box .order-list {
        margin: 0;
        padding: 10px 0;
        list-style-type: none;
    }

    .uc-order-item-finish .order-status, .uc-order-item-finish .order-desc {
        color: #b0b0b0;
    }

    .uc-order-item .order-status {
        font-size: 18px;
        text-align: left;
        margin-left: 30px;
    }

    .order-list-box .order-detail-table {
        width: 100%;
    }

    .order-list-box .uc-order-item-finish .order-detail-table th {
        border-bottom: 1px solid #e0e0e0;
    }

    .order-list-box .order-detail-table th p {
        margin: 0;
    }

    .order-list-box .order-detail-table th {
        height: 28px;
        padding: 0 30px 24px;
        border-bottom: 1px solid #e0e0e0;
        font-weight: 400;
        text-align: left;
        color: #757575;
        vertical-align: bottom;
    }

    .order-list-box .order-detail-table th .sep {
        color: #e0e0e0;
    }

    .sep, .ndash {
        margin: 0 .25em;
        font-family: sans-serif;
    }

    .order-list-box .order-detail-table th.col-sub {
        width: 340px;
        text-align: right;
    }

    .order-list-box .order-detail-table th .num {
        height: 18px;
        margin-right: 5px;
        font-size: 28px;
        font-weight: 200;
        line-height: 1;
        color: #333;
    }

    .order-list-box .order-detail-table td {
        padding: 0 30px;
    }

    .order-list-box .goods-list {
        margin: 0;
        padding: 10px 0;
        list-style-type: none;
    }

    .order-list-box .goods-list li {
        position: relative;
        margin: 10px 0;
        padding: 18px 18px 18px 100px;
        line-height: 22px;
        color: #333;
    }

    .order-list-box .goods-list .figure-thumb {
        position: absolute;
        left: 0;
        top: 0;
    }

    .order-list-box .goods-list .figure-thumb a {
        display: block;
    }

    .order-list-box .goods-list .name {
        margin: 0;
        text-align: left;
    }

    .order-list-box .goods-list .name a {
        color: #333;
    }

    .order-list-box .goods-list .price {
        margin: 0;
        text-align: left;
    }

    .order-list-box .order-detail-table .order-actions {
        padding-top: 20px;
        text-align: right;
        vertical-align: top;
    }

    .order-list-box .order-detail-table .order-actions .btn {
        display: block;
        margin: 0 0 10px auto;
    }

</style>
