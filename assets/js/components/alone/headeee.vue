<template>
    <div>
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                :router="true"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <i class="el-icon-loading" style="position: absolute;left: 50px;top: 20px;color: yellow;font-size: 30px;font-weight: 700;  "></i>
            <span style="position: absolute;left: 90px;top:5px;color: yellow;font-weight: 700;  "> P D D</span>
        </el-menu>
    </div>
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