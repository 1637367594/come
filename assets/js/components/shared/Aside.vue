<template>
    <div>
    <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true">
        <el-menu-item index="/">
            <span slot="title">
                <i class="el-icon-menu"></i>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页
            </span>
        </el-menu-item>
        <el-submenu index="/shop">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>商城管理</span>
            </template>

            <el-menu-item-group>
                <el-menu-item index="/shop"><i class="el-icon-rank"></i>仪表盘</el-menu-item>
                <el-menu-item index="/shop/orders"><i class="el-icon-rank"></i>订单管理</el-menu-item>
                <el-menu-item index="/shop/products"><i class="el-icon-edit"></i>商品管理</el-menu-item>
                <el-menu-item index="/shop/categories"><i class="el-icon-more"></i>商品分类</el-menu-item>

                <el-menu-item index="/shop/brands"><i class="el-icon-view"></i>商品品牌</el-menu-item>
                <el-menu-item index="/shop/customers"><i class="el-icon-mobile-phone"></i>会员管理</el-menu-item>
                <el-menu-item index="/shop/expresses"><i class="el-icon-tickets"></i>物流运费</el-menu-item>
                <el-menu-item index="/shop/products/trash"><i class="el-icon-delete"></i>商品回收站</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-picture-outline"></i>
                <span>广告中心</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/ads"><i class="el-icon-rank"></i>广告管理</el-menu-item>
                <el-menu-item index="/ads/adcategories"><i class="el-icon-more"></i>广告分类</el-menu-item>
                <el-menu-item index="/ads/trash"><i class="el-icon-delete"></i>广告回收站</el-menu-item>
            </el-menu-item-group>
        </el-submenu>


        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-goods"></i>
                <span>官网管理</span>
            </template>

            <el-menu-item index="4-1"><i class="el-icon-rank"></i>文章管理</el-menu-item>
            <el-menu-item index="4-2"><i class="el-icon-document"></i>栏目管理</el-menu-item>
            <el-menu-item index="4-3"><i class="el-icon-share"></i>友情链接</el-menu-item>
            <el-menu-item index="4-4"><i class="el-icon-delete"></i>文章回收站</el-menu-item>
        </el-submenu>

        <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-goods"></i>
                <span>系统管理</span>
            </template>

            <el-menu-item index="5-1"><i class="el-icon-setting"></i>系统设置</el-menu-item>
            <el-menu-item index="5-2"><i class="el-icon-refresh"></i>缓存管理</el-menu-item>
            <el-menu-item index="/shop/aa"><i class="el-icon-star-on"></i>用户管理</el-menu-item>
        </el-submenu>
    </el-menu>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                isCollapse: true
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>


<style>
    .el-menu-item-group__title{
        padding: 0;
    }
</style>
