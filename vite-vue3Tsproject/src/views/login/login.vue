<template>
  <div class="login">
    <div class="login-bg">
      <div><el-input v-model="userForm.account" placeholder="Please input" /></div>
      <div>
        <el-input
          v-model="userForm.password"
          type="password"
          placeholder="Please input password"
          show-password
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
const userForm = reactive({
    account: <string>'',
    password: <string>'',
})
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
