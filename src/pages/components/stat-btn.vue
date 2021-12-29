<!--
 * @Author: tackchen
 * @Date: 2021-12-28 01:03:25
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-28 01:07:43
 * @FilePath: /excel/src/pages/components/stat-btn.vue
 * @Description: Coding something
-->
<template>
    <el-dropdown size='mini' @command="stat">
        <el-button icon='el-icon-pie-chart' size='mini'>
            数据统计<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="0"><i class="el-icon-user"></i> 随访统计</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    name: 'stat-btn',
    data () {
        return {
            
        };
    },
    methods: {
        stat (command) {
            console.log(command);
        },
    }
};
</script>
<style lang="less">

</style>
            