<template>
  <!-- 首页顶部导航 -->
  <div class="home-header-top">
    <div class="home-header-sysName">精捷项目组管理客户端</div>
    <div class="home-header-user">
      <a href="">安全退出</a>
      <div class="user">
        <img
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          alt=""
          class="user-head-img"
        />
        <div class="user-info">
          <div class="user-name">华先生</div>
          <div class="current-time">
            {{ currentTime.dateObj.Today }} {{ currentTime.dateObj.Week }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 面包屑导航 -->
  <div class="home-header-pageList">
    <el-tabs
      v-model="navIndex"
      type="card"
      class="demo-tabs"
      @tab-remove="removeTab"
      @tab-click="changePage"
    >
      <el-tab-pane
        v-for="item in store.state.menuRouter.tagViewList"
        :key="item.name"
        :label="item.meta?.title"
        :name="item.name"
        :closable="item.name === 'homeIndex' ? false : true"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { Ref, ref, reactive, watch, onMounted, onUnmounted } from "vue";
import { GetCurrentTime } from "../tool/common";
import { useRouter, RouteLocationMatched } from "vue-router";
import { useStore } from "vuex";
import type { TabsPaneContext } from 'element-plus'

let currentTime = reactive({
  // 时钟
  dateObj: GetCurrentTime(),
});
setInterval(function () {
  currentTime.dateObj = GetCurrentTime();
}, 1000);

const store = useStore();
const router = useRouter();
/* 面包屑导航--开始*/
let navIndex = ref(router.currentRoute.value?.name);

// 跟踪路由

console.log("1", router.currentRoute.value);
watch(
  () => router.currentRoute.value,
  (newValue: any) => {
    let curRouter = { ...router.currentRoute.value };
    store.commit("menuRouter/changeTagList", curRouter);
    navIndex.value = router.currentRoute.value.name;
  },
  { immediate: true }
);

// 删除tabs
const removeTab = (targetName: string) => {
  let newTabList = store.state.menuRouter.tagViewList.filter((item:any)=> item.name !== targetName);
  
  if(navIndex.value === targetName) {
    let lastItem = newTabList[newTabList.length - 1]
    router.push(lastItem.href)
  }
  store.commit("menuRouter/updateTagViewList", newTabList);
};

// 点击tab跳转页面
const changePage = (pane: TabsPaneContext, ev: Event) => {
  if(pane.paneName === navIndex.value) return
  let clickitem = store.state.menuRouter.tagViewList.filter((item:any) =>item.name === pane.paneName)[0];
  router.push(clickitem.href)

};

// 监听页面刷新
const unloadPage = function (e: any) {
  let tabViews = store.state.menuRouter.tagViewList;
  sessionStorage.setItem("tabViews", JSON.stringify(tabViews));
};
onMounted(() => {
  window.addEventListener("beforeunload", (e) => unloadPage(e));
  // 页面初始化加载判断缓存中是否有数据
  let oldViews = JSON.parse(sessionStorage.getItem("tabViews")!) || [];
  if (oldViews.length > 0) {
    store.state.menuRouter.tagViewList = oldViews;
  }
});
onUnmounted(() => {
  window.removeEventListener("beforeunload", (e) => unloadPage(e));
});

/* 面包屑导航--结束*/
</script>
