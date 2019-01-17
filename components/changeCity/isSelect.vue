<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select 
      v-model="pvalue" 
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-select 
      v-model="cvalue" 
      :disabled="!city.length"
      placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <span class="name">直接搜索:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      pvalue: "",
      province: [],
      cvalue: "",
      city: [],
      input: "",
      cities: [] //全国城市列表
    };
  },
  watch: {
    pvalue: async function(newVal, oldVal) {
      this.requestCity(newVal);
    }
  },
  async mounted() {
    this.requestProvince();
  },
  methods: {
    ...mapActions({
      SET_POSITION: "SET_POSITION"
    }),
    querySearchAsync(queryString, cb) {
      this._debounce(async () => {
        let { cities } = this;
        if (cities.length) {
          cb(cities.filter(item => item.value.indexOf(queryString) > -1));
        } else {
          let { status, data: { city } } = await this.$axios.get(`/geo/city`);
          if (status === 200) {
            this.cities = this._changeDataType(city, "0");
            cb(cities.filter(item => item.value.indexOf(queryString) > -1));
          } else {
            cb([]);
          }
        }
      }, 500);
    },
    handleSelect(item) {
      // this.SET_POSITION({ city: value });
      // this.$router.push("/")
    },
    async requestProvince() {
      let { status, data: { province } } = await this.$axios.get(
        `/geo/province`
      );
      if (status === 200) {
        this.province = this._changeDataType(province);
        this.pvalue = "";
      }
    },
    async requestAllCities() {
      let { status, data: { city } } = await this.$axios.get(`/geo/city`);
      if (status === 200) {
        this.cities = this._changeDataType(city, "0");
      }
    },
    async requestCity(val) {
      let { status, data: { city } } = await this.$axios.get(
        `/geo/province/${val}`
      );
      if (status === 200) {
        this.city = this._changeDataType(city);
      }
    },
    _changeDataType(val, type) {
      if (type) {
        return val.map(item => {
          return {
            value: item.name
          };
        });
      } else {
        return val.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
      }
    },
    _debounce(method, delay) {
      clearTimeout(method.tId);
      method.tId = setTimeout(function() {
        method.call();
      }, delay);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>

