<template>
  <div class="data-content">
    <div class="table-head">
      <div class="t-h-title">
        <el-icon><Grid /></el-icon>
        <span>导出管理</span>
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
          <el-button type="success" :icon="Plus" @click="opendialog('新建')"
            >新建</el-button
          >
          <el-button type="primary" :icon="EditPen" @click="opendialog('编辑')"
            >编辑</el-button
          >
          <el-button type="danger" :icon="Delete">删除</el-button>
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

    <el-dialog
      class="half-inline-form"
      v-model="dialogVisible"
      :title="dialogTitle"
      width="1566px"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        :model="formInline"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="编号" prop="name">
          <el-input-number
            v-model="formInline.num"
            class="mx-4"
            :min="1"
            :max="10"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="数据服务器名称" prop="name">
          <el-input
            v-model="formInline.user"
            placeholder="请输入数据服务器名称"
          />
        </el-form-item>
        <el-form-item label="枚举最小值" prop="name">
          <el-input-number
            v-model="formInline.num"
            class="mx-4"
            :min="1"
            :max="10"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="枚举最大值" prop="name">
          <el-input-number
            v-model="formInline.num"
            class="mx-4"
            :min="1"
            :max="10"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="数据源通知地址" prop="name">
          <el-input
            v-model="formInline.user"
            placeholder="请输入数据源通知地址"
          />
        </el-form-item>
        <el-form-item label="数据导出个数" prop="name">
          <el-input-number
            v-model="formInline.num"
            class="mx-4"
            :min="1"
            :max="10"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <div class="dialog-excel-table">
        <div class="dialog-excel-table-title">
          <span class="excel-title-table"
            ><el-icon><Menu /></el-icon>&nbsp;excel字段管理</span
          >
          <span class="flex-height-center"
            ><span class="title-item"
              ><el-icon><IceTea /></el-icon>&nbsp;快速导入</span
            ><span class="title-item"
              ><el-icon><Plus /></el-icon>&nbsp;添加行</span
            ><span class="title-item"
              ><el-icon><Delete /></el-icon>&nbsp;删除行</span
            ><span class="title-item"
              ><el-icon><Refresh /></el-icon>&nbsp;刷新</span
            ></span
          >
        </div>
        <div class="">
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
    </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElTable, ElMessageBox, ElMessage, FormRules } from "element-plus";
import Pagination from "@/components/Pagination.vue";
import { Delete, Plus, Search, EditPen } from "@element-plus/icons-vue";

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

// 弹窗
const dialogVisible = ref(false);
const dialogTitle = ref("");
const opendialog = (name: string) => {
  if (name === "编辑" && multipleSelection.value.length === 0) {
    ElMessage.error("请选择要编辑的数据");
  } else if (name === "编辑" && multipleSelection.value.length > 1) {
    ElMessage.error("只能选择一条数据进行编辑");
  } else {
    dialogTitle.value = name;
    dialogVisible.value = true;
  }
};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

// 表单
const formInline = reactive({
  user: "",
  region: "",
  num: 0,
});
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
});
</script>
