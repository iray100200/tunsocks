/* global chrome */

function setProxy () {
  var config = {
    mode: chrome.proxy.Mode.FIXED_SERVERS,
    rules: {
      singleProxy: {
        scheme: chrome.proxy.Scheme.SOCKS5,
        host: "localhost"
      },
      bypassList: ["baidu.com"]
    }
  }
  
  chrome.proxy.settings.set({
    value: config, 
    scope: 'regular'
  },
  function(config) {
    console.log(config)
  })

  chrome.proxy.onProxyError.addListener((detail) => {
    console.log(detail)
  })
}

setProxy()