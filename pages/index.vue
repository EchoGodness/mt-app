<template>
  <div class="index"/>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Index",
  computed: {
    ...mapGetters(["position", "hots"])
  },
  mounted() {
    this.routerLink()
  },
  methods:{
    routerLink(){
      if(this.position.city){
        this.hots.forEach(item=>{
          if(item.name&&item.name=="市辖区"){
            if (item.province === this.position.city) {
              this.$router.push({ name: "home", params: { city: item.url } });
            }
          }else{
            if (item.name&&item.name === this.position.city) {
              this.$router.push({ name: "home", params: { city: item.url } });
            }
          }
        })
      }else{
        this.$router.push({ name: "home", params: { city: "sz" } });
      }
    }
  }
};
</script>

<style>
</style>
