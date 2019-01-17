<template>
  <div 
    v-if="hots&&hots.length>0" 
    class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd 
        v-for="item in hots" 
        :key="item.id" 
        style="cursor:pointer;"
        @click="jumpRouter(item.name==='市辖区'?item.province:item.name,item.url)">
        {{ item.name==='市辖区'?item.province:item.name }}
        <!-- <nuxt-link :to="{name:'index',params:{city:item.url}}">{{ item.name==='市辖区'?item.province:item.name }}</nuxt-link> -->
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["hots"])
  },
  methods: {
    ...mapActions({
      SET_POSITION: "SET_POSITION"
    }),
    jumpRouter(value, url) {
      this.SET_POSITION({ city: value });
      this.$router.push({ name: "home", params: { city: url } });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changeCity/hot.scss";
</style>

