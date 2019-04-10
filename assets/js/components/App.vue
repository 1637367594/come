<template>
    <el-container>
        <el-header>
            <AdminHeader></AdminHeader>
        </el-header>
        <el-container>

            <el-aside width="200px">
                <Aside></Aside>
            </el-aside>

            <el-main class="animate_fix"> <!--添加动画效果-->
                <transition name="fade">
                    <router-view/>
                </transition>
            </el-main>

        </el-container>
    </el-container>
</template>

<script>
    import Aside from './shared/Aside.vue'
    import AdminHeader from './shared/Header.vue'

    export default {
        name: 'App',
        components: {
            Aside,
            AdminHeader
        }
    }
</script>
<style>
    .el-header {
        text-align: center;
        line-height: 60px;
        padding: 0;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        /*line-height: 200px;*/
        border-right: solid 1px #e6e6e6;
        background-color: #fff;
    }

    .el-menu {
        border: none;
    }

    .el-main {
        background-color: #fff;
        color: #333;
        /*line-height: 160px;*/
        padding: 0;
    }

    html, body {
        height: 100%;
    }

    body > .el-container {
        height: 100%;
    }

    .el-container {
        height: 100%;
    }

    .el-aside {
        height: 100%;
        background-color: rgb(84, 92, 100)
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .el-aside::-webkit-scrollbar {
        display: none;
    }

    .has-gutter th div.cell {
        text-align: center;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .5s ease;
    }

    .fade-enter, .fade-leave-to {
        transform: scale(.98);
        opacity: 0;
    }

    .animate_fix {
        position: relative;
        width: 100%;
    }

    .animate_fix > div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
    }

    /*订单管理CSS设置*/
    .el-card__body {
        padding: 5px;
    }

    .el-collapse-item:last-child {
        margin: 0;
    }

    .el-collapse-item__header {
        height: 38px;
        line-height: 38px;
        /*border: 1px solid red;*/
    }

    .el-collapse-item__arrow {
        line-height: 38px;
        height: 38px;
    }

    .el-footer {
        margin-top: 30px;
        text-align: center;
    }

    .el-table td, .el-table th {
        text-align: center;
    }

</style>
