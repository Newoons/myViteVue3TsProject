<template>
  <div class="data-content">
    <div class="table-head">
      <div class="t-h-title">
        <el-icon><Grid /></el-icon>
        <span>导出日志</span>
      </div>
      <div class="t-h-operate">
        <div class="search-box">
          <el-input v-model="input" placeholder="标题" />
        </div>
        <div class="search-box">
          <el-select v-model="value" class="m-2" placeholder="数据来源">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="btn-group">
          <el-button type="primary" :icon="Search">查询</el-button>
          <el-button type="danger" :icon="Delete">删除</el-button>
          <el-button type="success" plain :icon="Bottom">导出</el-button>
        </div>
      </div>
    </div>
    <div class="table">
    <el-scrollbar>
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="Date" width="120">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name" label="Name" width="120" />
        <el-table-column
          property="address"
          label="Address"
          show-overflow-tooltip
        />
      </el-table>
      <Pagination></Pagination>
    </el-scrollbar>
    </div>

  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElTable, ElMessageBox, ElMessage } from "element-plus";
import Pagination from "@/components/Pagination.vue";
import { Delete, Search, Bottom } from "@element-plus/icons-vue";

const value = ref("");

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];

// 表格
interface User {
  date: string;
  name: string;
  address: string;
}

const input = ref("");
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

</script>
