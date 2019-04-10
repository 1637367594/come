<template>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <div class="menu_icon">
            <i class="el-icon-loading"></i> meimei
        </div>
        <el-submenu index="2">
            <template slot="title">Sunny 管理员</template>
            <el-menu-item index="2-1">清除缓存</el-menu-item>
            <el-menu-item index="2-2">设置</el-menu-item>
            <el-menu-item index="2-3">退出</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-menu--horizontal > .el-submenu {
        float: right;
    }
    .menu_icon{
        float:left;
        width: 200px;
        color: #D3DCE6;
        text-align: center;
        font-size:30px
    }

</style>
