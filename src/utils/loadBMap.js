export default function loadBMap(ak) {
  return new Promise(function(resolve, reject) {
    if (typeof BMap !== 'undefined') {
      var BMap = window.BMap
      resolve(BMap)
      return true
    }
    window.onBMapCallback = function() {
      var BMap = window.BMap
      resolve(BMap)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'https://api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=onBMapCallback'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
