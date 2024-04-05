<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" separator="/">
      <template v-for="link in links">
        <el-breadcrumb-item :key="link.path" v-if="link.name" :to="{ path: link.path }">
          {{ link.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
</template>
<script>


</script>