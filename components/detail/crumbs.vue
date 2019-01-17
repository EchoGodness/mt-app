<template>
  <div class="m-crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{ city }}美团</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">{{ city }}{{ type }}</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">{{ city }}{{ decodeURIComponent(keyword) }}</a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    keyword: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["position"]),
    city: function() {
      return this.position.city ? this.position.city.replace("市", "") : "";
    }
  }
};
</script>

<style>
</style>
