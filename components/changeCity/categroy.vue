<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择:</dt>
      <dd 
        v-for="(item,i) in words" 
        :key="i">
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl 
      v-for="(item,i) in cities" 
      :key="i" 
      class="m-categroy-section">
      <dt :id="'city-'+item.title">{{ item.title }}</dt>
      <dd style="cursor: pointer;">
        <span 
          v-for="c in item.city" 
          :key="c" >
          {{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      words: "ABCDEFGHIZKLMNOPQRSDUVWSYZ".split("")
    };
  },
  computed: {
    ...mapGetters(["cities"])
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changeCity/categroy.scss";
</style>
