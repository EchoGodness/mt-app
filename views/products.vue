<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"/>
    </el-col>
  </el-row>

</template>

<script>
import { mapGetters } from "vuex";
import Crumbs from "@/components/product/crumb.vue";
import Categroy from "@/components/product/categroy.vue";
import List from "@/components/product/list.vue";
import Amap from "@/components/public/map/index.vue";
export default {
  components: {
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data() {
    return {
      list: [],
      types: [],
      areas: [],
      keyword: "",
      point: []
    };
  },
  computed: {
    ...mapGetters(["position"])
  },
  watch: {
    $route(newVal, oldVal) {
      this.keyword = decodeURIComponent(this.$route.query.keyword);
    },
    keyword(newVal, oldVal) {
      this.requestData();
    }
  },
  mounted() {
    this.keyword = decodeURIComponent(this.$route.query.keyword);
  },
  methods: {
    async requestData() {
      let { status, data: { count, pois } } = await this.$axios.get(
        "/search/resultsByKeywords",
        {
          params: {
            keyword: this.keyword,
            city: this.position.city
          }
        }
      );
      let { status: status2, data: { areas, types } } = await this.$axios.get(
        "/categroy/crumbs",
        {
          params: {
            city: this.position.city
          }
        }
      );
      if (status === 200 && count > 0 && status2 === 200) {
        this.list = pois.filter(item => item.photos.length).map(item => {
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random() * 10000),
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: "可订明日",
            location: item.location,
            module: item.type.split(";")[0]
          };
        });
        (this.areas = areas
          ? areas.filter(item => item.type !== "").slice(0, 5)
          : []),
          (this.types = types
            ? types.filter(item => item.type !== "").slice(0, 5)
            : []);
        this.point = (pois.find(item => item.location).location || "").split(
          ","
        );
      }
    }
  }
  //实时跟踪keyword的变化，使用asyncData没办法做到 ，页面数据不变化 ，此处不采用
  // async asyncData(ctx) {
  //   console.log(1, ctx.query);
  //   let keyword = decodeURIComponent(ctx.query.keyword);
  //   let city = ctx.store.state.geo.position.city;
  //   let { status, data: { count, pois } } = await ctx.$axios.get(
  //     "/search/resultsByKeywords",
  //     {
  //       params: {
  //         keyword,
  //         city
  //       }
  //     }
  //   );
  //   let { status: status2, data: { areas, types } } = await ctx.$axios.get(
  //     "/categroy/crumbs",
  //     {
  //       params: {
  //         city
  //       }
  //     }
  //   );
  //   if (status === 200 && count > 0 && status2 === 200) {
  //     return {
  //       list: pois.filter(item => item.photos.length).map(item => {
  //         return {
  //           type: item.type,
  //           img: item.photos[0].url,
  //           name: item.name,
  //           comment: Math.floor(Math.random() * 10000),
  //           rate: Number(item.biz_ext.rating),
  //           price: Number(item.biz_ext.cost),
  //           scene: item.tag,
  //           tel: item.tel,
  //           status: "可订明日",
  //           location: item.location,
  //           module: item.type.split(";")[0]
  //         };
  //       }),
  //       keyword,
  //       areas: areas ? areas.filter(item => item.type !== "").slice(0, 5) : [],
  //       types: types ? types.filter(item => item.type !== "").slice(0, 5) : [],
  //       point: (pois.find(item => item.location).location || "").split(",")
  //     };
  //   }
  // },
};
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
