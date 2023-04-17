<template>
  <div class="home" :class="switchMenuClassName">
    <!-- 左侧导航 -->
    <div class="home-left">
      <div class="menu-top">
        <img src="@/assets/images/vol.png" alt="" v-if="!isCollapse" />
        <el-icon @click="switchMenu"><Fold /></el-icon>
      </div>
      <el-scrollbar>
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        router
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="selectMenuItem"
      >
        <Menu></Menu>
      </el-menu>
    </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="home-top">
      <HomeHeader></HomeHeader>
    </div>
    <!-- 内容区域 -->
    <div class="home-content">
      <RouterView v-slot="{Component}">
        <keep-alive >
          <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name"></component>
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name"></component>
      </RouterView>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from "vue";
import HomeHeader from "@/components/HomeHeader.vue";
import Menu from "@/components/Menu.vue"
export default defineComponent({
  name: "Home",
  components: { HomeHeader,Menu },
  setup() {
    const handleOpen = (key: string, keyPath: string[]) => {
    };
    const handleClose = (key: string, keyPath: string[]) => {};
    // 菜单折叠展开
    let isCollapse = ref<boolean>(false);
    const switchMenu = () => {
      isCollapse.value = !isCollapse.value;
    };
    let switchMenuClassName = computed<string>(() =>
      isCollapse.value ? "hideMenu" : "openMenu"
    );

    const selectMenuItem = (index: string, indexPath: string, item: object, routeResult: any) =>{
      // console.log('i',item,routeResult)
    }
    return {
      isCollapse,
      switchMenu,
      switchMenuClassName,
      handleOpen,
      handleClose,
      selectMenuItem
    };
  },
});
</script>
<style lang="scss" scoped></style>
