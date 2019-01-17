<template>
  <div class="m-geo">
    <i class="el-icon-location"/>{{ position.city }}
    <a 
      class="changeCity" 
      @click="jumpRouter">切换城市</a>[香河 廊坊 天津]
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["position", "hots"])
  },
  mounted() {
    if (this.$nuxt._route.params.city) {
      let data = this.hots.filter(item => {
        return item.url == this.$nuxt._route.params.city;
      })[0];
      if (data != undefined) {
        let { province, name } = data;
        this.SET_POSITION({
          province,
          city: name === "市辖区" ? province : name
        });
      }else{
        this.$router.push({ name: "home", params: { city: "sz" } });
      }
    }
  },
  methods: {
    ...mapActions({
      SET_POSITION: "SET_POSITION"
    }),
    jumpRouter() {
      this.$router.push({
        name: "changeCity",
        params: {
          city: this.$nuxt._route.params.city
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>