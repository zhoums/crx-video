export default {
  $http: function(method, uri) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open(method, uri, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          // JSON解析器不会执行攻击者设计的脚本.
          var resp = JSON.parse(xhr.responseText);
          resolve(resp);
        }
      }
      xhr.send();
    })

  },
  sleep: function(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime)
        return;
    }
  },
  getDateRange: (days = 0) => {
    let now = new Date().getTime();
    let target = new Date(now - days * 24 * 60 * 60 * 1000);
    let month = target.getMonth() + 1;
    month = month > 9 ? month : "0" + month;
    let format = target.getFullYear() + '-' + month + "-" + target.getDate();
    return format;

  },
  parseParams: function(data) {
    try {
      var tempArr = [];
      for (var i in data) {
        var key = encodeURIComponent(i);
        var value = encodeURIComponent(data[i]);
        tempArr.push(key + '=' + value);
      }
      var urlParamsStr = tempArr.join('&');
      return urlParamsStr;
    } catch (err) {
      return '';
    }
  },
  loadScript: function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (typeof(callback) != "undefined") {
      if (script.readyState) {
        script.onreadystatechange = function() {
          if (script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        script.onload = function() {
          callback();
        };
      }
    };
    script.src = url;
    document.body.appendChild(script);
  },
}