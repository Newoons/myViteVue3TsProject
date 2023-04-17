<template>
    <div class="notFound"></div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'NotFound',
    components: {
    },
    setup() {
      return {
      }
    },
  });
  </script>
  <style lang="scss" scoped>
  .notFound {
    height: 100%;
    width: 100%;
    background: url(@/assets/images/404.png) no-repeat;
    background-position: center;
  }
  </style>
  