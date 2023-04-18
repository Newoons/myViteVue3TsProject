<template>
  <!-- 左侧菜单导航 -->
  <template v-for="item in routerList[1].children" :key="item.name">
    <el-sub-menu v-if="item.children" :index="item.path">
      <template #title>
        <el-icon><Memo /></el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <el-menu-item
        :index="`${item.path}/${sonitem.path}`"
        v-for="sonitem in item.children"
        :key="item.path"
        >{{ sonitem.meta?.title }}</el-menu-item
      >
    </el-sub-menu>
    <el-menu-item index="/homeIndex" v-else>
      <el-icon><Shop /></el-icon>
      <span>{{ item.meta?.title }}</span>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
import router from "../router/index";
const routerList = router.options.routes;
</script>
