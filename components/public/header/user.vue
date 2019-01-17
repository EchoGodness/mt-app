<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      [<nuxt-link :to="{name:'exit'}">退出</nuxt-link>]
    </template>
    <template v-else>
      <a 
        href="javascript:;" 
        class="login" 
        @click="jumpRouter('login')">登陆</a>
      <a 
        href="javascript:;" 
        class="register" 
        @click="jumpRouter('register')">注册</a>
      
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  async mounted() {
    const { status, data: { user } } = await this.$axios.get("/users/getUser");
    this.user = user;
  },
  methods: {
    jumpRouter(name) {
      this.$router.push({
        name,
        params: { city: this.$route.params.city }
      });
    }
  }
};
</script>
<style lang="scss">
</style>