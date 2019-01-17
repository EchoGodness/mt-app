<template>
  <section class="m-istyle">
    <dl>
      <dt>有格调</dt>
      <dd 
        v-for="(item,i) in tabs" 
        :key="i" 
        :class="{active:kind===item.kind}"
        :kind="item.kind" 
        :keyword="item.keyword"
        @mouseover="over">{{ item.name }}</dd>
    </dl>
    <ul class="ibody">
      <li 
        v-for="(items,j) in curDetails" 
        v-show="j<6"
        :key="j">
        <el-card 
          :body-style="{ padding: '0px' }" 
          shadow="never">
          <img 
            :src="items.src" 
            class="image">
          <ul class="cbody">
            <li class="title">{{ items.name }}</li>
            <li class="pos">{{ items.infor }}</li>
            <li class="price">￥<em>{{ items.price }}</em><span>起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      kind: "all",
      tabs: [
        {
          name: "全部",
          keyword: "景点",
          kind: "all",
          data: []
        },
        {
          name: "约会聚餐",
          keyword: "美食",
          kind: "part",
          data: []
        },
        {
          name: "丽人SPA",
          keyword: "丽人",
          kind: "spa",
          data: []
        },
        {
          name: "电影演出",
          keyword: "电影",
          kind: "movie",
          data: []
        },
        {
          name: "品质出游",
          keyword: "旅游",
          kind: "travel",
          data: []
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["position"]),
    curDetails: function() {
      return this.tabs.filter(item => item.kind === this.kind)[0].data;
    }
  },
  async mounted() {
    let arr = ["all", "part", "spa", "movie", "travel"];
    if (this.position) {
      arr.map(item => {
        this.requestData(item);
      });
    }
  },
  methods: {
    requestData: async function(keyword) {
      let { status, data: { count, pois } } = await this.$axios.get(
        "/search/resultsByKeywords",
        {
          params: {
            city: this.position,
            keyword
          }
        }
      );
      if (status === 200 && count > 0) {
        let r = pois.filter(item => item.photos.length).map(item => {
          return {
            name: item.name,
            infor: item.type.split(";")[0],
            price: item.biz_ext.cost || "暂无",
            src: item.photos[0].url,
            url: "//abc.com"
          };
        });
        this.tabs.map(item => {
          if (item.kind == keyword) {
            item.data = r;
          }
        });
      }
    },
    over: async function(e) {
      this.kind = e.target.getAttribute("kind");
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
