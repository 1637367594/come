
<template>
    <div>
        <el-row class="tac">
        <el-col :span="24">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :router="true"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="/">首页</el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商城管理</span>
                    </template>
                        <el-menu-item index="1-1">仪表盘</el-menu-item>
                        <el-menu-item index="1-2">订单管理</el-menu-item>
                        <el-menu-item index="/manage">商品管理</el-menu-item>
                        <el-menu-item index="/classify">商品分类</el-menu-item>
                        <el-menu-item index="/hhh">商品品牌</el-menu-item>
                        <el-menu-item index="/seek">会员管理</el-menu-item>
                        <el-menu-item index="1-7">物流运费</el-menu-item>
                        <el-menu-item index="/recycle">商品回收站</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>广告中心</span>
                    </template>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>官网管理</span>
                    </template>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>系统管理</span>
                    </template>
                </el-submenu>
            </el-menu>
        </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
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
    .el-aside::-webkit-scrollbar {
        width:5px;
        height:5px;
    }
</style>