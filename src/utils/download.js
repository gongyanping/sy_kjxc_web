/*
 * @Author: gyp
 * @Date: 2020-03-17 09:42:11
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-08 15:49:26
 * @Description: 下载公用方法
 * @FilePath: \gs_xzsp_web\src\utils\download.js
 */
export const downloadFile = (url, fileName = '') => {
  if (!url) {
    throw new Error('下载地址不能为空');
  }
  if (isIE()) {
    ieDown(url)
  } else {
    const aLink = document.createElement('a');
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    aLink.download = fileName;
    aLink.href = url;
    aLink.dispatchEvent(evt)
  }
};
const ieDown = url => {
  window.open(url)
};
export const isIE = () => {
  const explorer = window.navigator.userAgent;
  return explorer.indexOf('MSIE') >= 0 || explorer.indexOf('Trident/7.0') >= 0 || explorer.indexOf('Edge') >= 0;
};

// 下载Excel调用此方法函数
export const fileDownload = (data, fileName) => {
  let blob = new Blob([data], {
    type: 'application/octet-stream'
  });
  let filename = fileName || 'filename.xls';
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename); // 以本地形式保存文件
  } else {
    let blobURL = window.URL.createObjectURL(blob); // 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
    let tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
}
