<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团">
      </el-col>
      <el-col
        :span="15"
        class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"/>
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <dl
            v-if="isHotPlace"
            class="hotPlace">
            <dt>热门搜索</dt>
            <dd 
              v-for="(item,i) in hotPlace.slice(0,5)" 
              :key="i" 
              @click="jumpRouter(item.name)">{{ item.name }}
            </dd>
          </dl>
          <dl
            v-if="isSearchList" 
            class="searchList">
            <dd 
              v-for="(item,i) in searchList" 
              :key="i"
              @click="jumpRouter(item.name)">{{ item.name }}
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a 
            v-for="(item,i) in hotPlace.slice(0,5)" 
            :key="i" 
            @click="jumpRouter(item.name)">{{ item.name }}
          </a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link 
              to="/takeout" 
              class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link 
              to="/takeout" 
              class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link 
              to="/takeout" 
              class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link 
              to="/takeout" 
              class="apartment">民俗公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link 
              to="/takeout" 
              class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col 
        :span="6" 
        class="right">
        <ul class="security">
          <li>
            <i class="refund"/>
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"/>
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"/>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
    
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "", // input的值
      isFocus: false,
      hotPlace: [],
      searchList: []
    };
  },
  computed: {
    ...mapGetters(["position"]),
    isHotPlace: function() {
      return this.isFocus && !this.search;
    },
    isSearchList: function() {
      return this.isFocus && this.search;
    }
  },
  watch: {
    position(newVal, oldVal) {
      this.requestData();
    }
  },
  mounted() {
    this.requestData();
  },
  methods: {
    ...mapActions({
      SET_POSITION: "SET_POSITION"
    }),
    requestData: async function() {
      let { status: hotStatus, data: { result } } = await this.$axios.get(
        `/search/hotPlace`,
        {
          params: {
            city: this.position.city.replace("市", "")
          }
        }
      );
      this.hotPlace = hotStatus === 200 ? result : [];
    },
    jumpRouter(name) {
      // location.href=`/${this.$nuxt._route.params.city}/products/?keyword=${encodeURIComponent(name)}`    //页面加载会闪烁 不采用
      this.$router.push({
        name: "products",
        params: {
          city: this.$nuxt._route.params.city
        },
        query: { keyword: encodeURIComponent(name) }
      });
    },
    focus: function() {
      this.isFocus = true;
    },
    blur: function() {
      // setTimeout中函数内的this是指向了window对象，这是由于setTimeout()调用的代码运行在与所在函数完全分离的执行环境上。这会导致这些代码中包含的 this 关键字会指向 window (或全局)对象。
      setTimeout(() => {
        this.isFocus = false;
      }, 200);
    },
    input: async function() {
      this.searchList = []; //清空数据
      // 观察input数据
      if (this.position.city) {
        if (this.search) {
          let city = this.position.city.replace("市", "");
          let { status, data: { top } } = await this.$axios.get("/search/top", {
            params: {
              input: this.search,
              city
            }
          });
          this.searchList = status === 200 ? top : [];
        }
      }
    },
    mounted() {}
  }
};
</script>
<style lang="scss">
</style>