var barcodeValidation = function (barcode) {
  if (barcode.length != 11) {
    return false
  }
  var n = []
  var key
  for (var i = 0; i < barcode.length; i++) {
    if (i != 10) {
      n[i] = barcode.charAt(i)
    } else {
      key = barcode.charAt(i)
    }
  }
  var sum = 0
  var rounded
  var _key
  for (var i = 0; i < n.length; i++) {
    if (i % 2 == 0) {
      // even number
      sum += n[i] * 1
    } else {
      // odd number
      sum += n[i] * 3
    }
  }
  rounded = Math.ceil(sum / 10) * 10
  _key = Math.abs(rounded - sum)
  console.log({ sum, rounded, key, _key })
  if (key == _key) {
    return true
  } else {
    return false
  }
}

const result = barcodeValidation('99991440032')
console.log('result', result)
