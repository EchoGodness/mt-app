<template>
  <div class="m-menu">
    <dl 
      class="nav" 
      @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item,i) in menu"
        :key="i"
        @mouseenter="enter">
        <i :class="item.type"/>{{ item.name }}<span class="arrow"/>
      </dd>
      <div 
        v-if="kind!=''
        "
        class="detail"
        @mouseenter="sover"
        @mouseleave="sout">
        <template
          v-for="(items,j) in curdetail">
          <h4 :key="j">{{ items.title }}</h4>
          <span 
            v-for="itemss in items.child" 
            :key="itemss">{{ itemss }}</span>
        </template>
      </div>
    </dl>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      kind: "", //类型 hover改变
    };
  },
  computed: {
    ...mapGetters(["menu"]),
    curdetail: function() {
      return this.menu.filter(item => item.type === this.kind)[0].child;
    }
  },
  methods: {
    mouseleave: function() {
      let self = this;
      self._timer = setTimeout(() => {
        self.kind = "";
      }, 150);
    },
    enter: function(e) {
      this.kind = e.target.querySelector("i").className;
    },
    sover: function() {
      clearTimeout(this._timer);
    },
    sout: function() {
      this.kind = "";
    }
  }
};
</script>

