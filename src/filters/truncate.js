export default {
  install (Vue) {
    /**
     *
     * @param {String} text
     * @param {Number} length
     * @param {String} clamp
     *
     */
    Vue.filter('truncate', function (value, maxlen = 20, clamp = '...') {
      let v = value.trim()
      if (v.length > maxlen) {
        v = v.substring(0, maxlen) + clamp
      }
      return v
    })
  }
}
