// 入口
import config from './config'
import util from './util'
import Eventproxy from 'eventproxy'
import {
  darenCateTypeList,
  darenFansCountList,
  darenRoleList,
  darenServiceList, //直播--服务类型
  vedioCateType,
  cateType,
  TWCateTypeList,
  darenChannel,
  darenCount, //签约达人数
  darenCateTypeList2,
  MainActivity
} from './config'
//设置refer
let agentVersion = navigator.userAgent.toLowerCase().match(/chrome\/[\d.]+/gi).toString().match(/[\d]{1,}/g);
let bigVersion = Number(agentVersion[0]);
let ep = new Eventproxy();

let kui = bigVersion >= 72 ? ["blocking", "requestHeaders", "extraHeaders"] : ["blocking", "requestHeaders"];
// console.log(kui, 'kui')
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    // console.log(details)
    if (details.type === 'xmlhttprequest') {
      var exists = false;
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'Referer') {
          exists = true;
          // details.requestHeaders[i].value = 'https://v.taobao.com/';
          details.requestHeaders[i].value = 'https://h5.m.taobao.com/taolive/video.html?userId=2234284001';
          break;
        }
      }

      if (!exists) {
        details.requestHeaders.push({
          name: 'Referer',
          // value: 'https://v.taobao.com/'
          value: 'https://h5.m.taobao.com/taolive/video.html?userId=2234284001'
        });
      }

      return {
        requestHeaders: details.requestHeaders
      };
    }
  }, {
    urls: ['https://*.taobao.com/*', 'http://huodong.m.taobao.com/*']
  }, kui
);

let mtopjsonp4=data=>{
  console.log(data)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.greeting === "ad") {
    let param = request.as
    $.ajax({
      url: 'https://h5api.m.taobao.com/h5/mtop.mediaplatform.video.livedetail.itemlist/1.0/',
      data: param,
      success(res) {
        console.log("success")
        console.log(res)
      },
      error(data){
        console.log(data.responseText)
      }
    })
    $.ajax({
      url: 'https://h5api.m.taobao.com/h5/mtop.mediaplatform.live.livedetail/2.0/',
      data: request.data3,
      success(res) {
        console.log("success")
        console.log(res)
      },
      error(data){
        console.log(data.responseText)
      }
    })
  }


})