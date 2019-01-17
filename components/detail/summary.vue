<template>
  <dl class="m-sum-card" >
    <dt>
      <h1>{{ product.name }}</h1>
      <el-rate
        v-model="rate"
        disabled />
      <span v-if="product&&product.biz_ext">{{ Number(product.biz_ext.rating)||rate }}分</span>
      <span v-if="product&&product.biz_ext">人均￥{{ Number(product.biz_ext.cost) }}</span>
      <ul>
        <li @click="openMap(product.location)">地址：{{ product.address }}</li>
        <li>电话：{{ product.tel }}</li>
      </ul>
    </dt>
    <dd>
      <el-carousel
        height="214px"
        indicator-position="none">
        <el-carousel-item
          v-for="(item,idx) in product.photos"
          :key="idx">
          <h3><img
            :src="item.url"
            alt="item.title"
            width="100%"
            height="100%"></h3>
        </el-carousel-item>
      </el-carousel>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      sale: 70 + Math.floor(Math.random() * 300)
    };
  },
  computed: {
    rate: function() {
      return this.product && this.product.biz_ext
        ? Number(this.product.biz_ext.rating)
        : Math.floor(Math.random() * 5);
    }
  },
  methods: {
    openMap: function(location) {}
  }
};
</script>
