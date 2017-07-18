const pick = function (obj, keys = []) {
  let result = {}
  if (obj == null) return result
  for (let i = 0, len = keys.length, key, value; i < len; i++) {
    key = keys[i]
    value = obj[key]
    if (key in obj) {
      result[key] = value
    }
  }
  return result
}

const omit = function (obj, keys = []) {
  let result = {}
  if (obj == null) return result
  return pick(obj, Object.keys(obj).filter(function (k) {
    return keys.indexOf(k) === -1
  }))
}

export default {
  pick,
  omit
}
