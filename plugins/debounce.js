
import Vue from 'vue'
const INPUT = {
  install(Vue){
    Vue.prototype.debounce={
      debounce:function debounce(fn, delay) {
        console.log(fn, delay)
        var timer = null
        return function () {
          var context = this
          var args = arguments
          clearTimeout(timer)
          timer = setTimeout(function () {
            fn.apply(context, args)
          }, delay)
        }
      }
    }
  }
}

Vue.use(INPUT);