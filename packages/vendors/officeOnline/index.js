/*
 * @Author: zhanghan
 * @Date: 2023-01-09 21:21:33
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-15 23:44:23
 * @Descripttion: 渲染微软在线office浏览容器
 */
import EventBus from '../../util/EventBus'
/**
 * 渲染微软在线office浏览容器
 */
export default function(url, target) {
  // 跟随文件的协议访问
  const link = `${
    url.indexOf('https') > -1 ? 'https' : 'http'
  }://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`
  // 判断是否为手机
  const isMobile = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(
    navigator.userAgent
  )
  // 手机端会被重定向将整个页面刷新，暂时采用a标签跳转的方案
  if (isMobile) {
    const span = document.createElement('span')
    const fileName = url.substr(url.lastIndexOf('/') + 1)
    span.innerHTML = `请点击查看 ${fileName} 文件`
    span.style = `
      font-size: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      line-height: 100%;
      color: skyblue;
      text-decoration: underline;
      cursor: pointer;
    `
    span.onclick = function() {
      window.top.location.href = link
    }
    target.appendChild(span)
  } else {
    const iframe = document.createElement('iframe')
    iframe.src = link
    iframe.style = 'border:0;height: 100%;width:100%'
    // 允许执行脚本；允许同域请求；允许进行提交表单；允许模态框
    iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-modals'

    iframe.onload = function() {
      // Emit custom event when Office document is fully loaded
      EventBus.$emit('fileLoaded', { fileType: 'office', success: true })
    }
    target.appendChild(iframe)
  }
}
