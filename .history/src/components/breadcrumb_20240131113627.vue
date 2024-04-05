<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right" separator="/">
      <template v-for="link in links">
        <el-breadcrumb-item :key="link.path" v-if="link.name" :to="{ path: link.path }">
          {{ link.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style scoped>
.breadcrumb {
  margin: 20px;
  padding: 20px;
}
</style>