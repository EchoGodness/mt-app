import pyjs from "js-pinyin";
const geo = {
  state: {
    position: { province: "广东省", city: "深圳市" },
    cities: [],
    hots: [{ province: "北京市", name: "市辖区", id: "110100", pinyin: "BeiJin", url: "bj" },
    { province: "天津市", name: "市辖区", id: "120100", pinyin: "TianJin", url: "tj" },
    { province: "上海市", name: "市辖区", id: "310100", pinyin: "ShangHai", url: "sh" },
    { province: "江苏省", name: "南京市", id: "320100", pinyin: "NanJin", url: "nj" },
    { province: "浙江省", name: "杭州市", id: "330100", pinyin: "HanZhou", url: "hz" },
    { province: "湖北省", name: "武汉市", id: "420100", pinyin: "WuHan", url: "wh" },
    { province: "广东省", name: "广州市", id: "440100", pinyin: "GuangZhou", url: "gz" },
    { province: "广东省", name: "深圳市", id: "440300", pinyin: "ShenZhen", url: "sz" },
    { province: "四川省", name: "成都市", id: "510100", pinyin: "ChenDu", url: "cd" },
    { province: "陕西省", name: "西安市", id: "610100", pinyin: "XiAn", url: "xa" }]
  },
  mutations: {
    SET_POSITION(state, val) {
      state.position = val
    },
    SET_CITIES(state, val) {
      state.cities = val
    },
    // SET_HOTS(state, val) {
    //   state.hots = val
    // }
  },
  actions: {
    async nuxtServerInit({ commit }, { req, app }) {
      let { status: cStatus, data: { city: cities } } = await app.$axios.get(`/geo/city`);
      if (cStatus == 200) {
        let p, c, d = {}, arr = []
        cities.forEach(item => {
          p = pyjs.getFullChars(item.name).slice(0, 1)    //截取留下首字母
          c = p.charCodeAt(0)   //获取首字母的charCode
          // a-z:97-122 A-Z:65-90
          if (c > 64 && c < 91) {
            if (!d[p]) {
              d[p] = []
            }
            d[p].push(item.name)
          }
        })
        // Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组,其排列与使用 for...in 循环遍历该对象时返回的顺序一致(区别在于 for-in 循环也枚举原型链中的属性)。
        for (let [k, v] of Object.entries(d)) {
          arr.push({
            title: k,
            city: v
          })
        }
        arr.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
        commit('SET_CITIES', arr)
      }
      let { status:pStatus, data: { province, city } } = await this.$axios.get(
        `/geo/getPosition`
      );
      commit('SET_POSITION',pStatus === 200 ? { province, city } : { province: "", city: "" })

    },

    SET_POSITION: ({ commit }, position) => {
      commit('SET_POSITION', position)
    }
  }
}
export default geo
