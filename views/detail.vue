<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs 
          :type="type" 
          :keyword="keyword"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <summarys :product="product"/>
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row v-if="canOrder||!login">
      <el-col :span="24">
        <list 
          v-if="login" 
          :list="list"/>
        <div
          v-else
          class="deal-need-login">
          <img
            src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
            alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button
            type="primary"
            round>
            <nuxt-link :to="{name:'login'}">立即登录</nuxt-link>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Crumbs from "@/components/detail/crumbs";
import Summarys from "@/components/detail/summary";
import List from "@/components/detail/list";
import cartVue from "./cart.vue";
export default {
  components: {
    Crumbs,
    Summarys,
    List
  },
  data() {
    return {
      keyword: "",
      type: "",
      product: {},
      list: [],
      login: false
    };
  },
  computed: {
    ...mapGetters(["position"]),
    canOrder: function() {
      return this.list
        ? this.list.filter(item => item.photos.length).length
        : false;
    }
  },
  // watch: {
  //   keyword(newVal,oldVal){
  //     this.requestData()
  //   }
  // },
  // mounted(){
  //   this.keyword=decodeURIComponent(this.$route.query.keyword)
  //   this.type=decodeURIComponent(this.$route.query.type)
  // },
  methods: {
    async requestData() {
      let { keyword, type, position } = this;
      let {
        status,
        data: { product, more: list, login }
      } = await this.$axios.get(`/search/products`, {
        params: {
          keyword,
          type,
          city: position.city
        }
      });
      this.product = status === 200 ? product : {};
      this.list = status === 200 ? list : [];
      this.login = status === 200 ? login : false;
    }
  },
  async asyncData(ctx) {
    let keyword = decodeURIComponent(ctx.query.keyword);
    let type = decodeURIComponent(ctx.query.type);
    let { status, data: { product, more: list, login } } = await ctx.$axios.get(
      "/search/products",
      {
        params: {
          keyword,
          type,
          city: ctx.store.state.geo.position.city
        }
      }
    );
    if (status === 200) {
      return {
        keyword,
        product,
        type,
        list,
        login
      };
    } else {
      return {
        keyword,
        product: {},
        type,
        list: [],
        login: false
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/detail/index.scss";
</style>
