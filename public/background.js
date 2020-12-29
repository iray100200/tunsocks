/* global chrome */

function setProxy (host, port) {
  const config = {
    mode: chrome.proxy.Mode.FIXED_SERVERS,
    rules: {
      singleProxy: {
        scheme: chrome.proxy.Scheme.SOCKS5,
        host: host,
        port: Number(port)
      },
      bypassList: ["baidu.com"]
    }
  }
  
  chrome.proxy.settings.set({
    value: config, 
    scope: 'regular'
  }, function(config) {
    console.log(config)
  })

  chrome.proxy.onProxyError.addListener((detail) => {
    console.log(detail)
  })
}

chrome.runtime.onMessage.addListener(({ host, port, enable }) => {
  if (enable) {
    setProxy(host, port)
  } else {
    chrome.proxy.settings.set({
      value: {
        mode: 'direct'
      }, 
      scope: 'regular' 
    })
  }
})
