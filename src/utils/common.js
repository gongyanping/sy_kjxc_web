/*
 * @Author: gyp
 * @Date: 2020-05-09 18:16:42
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-12 16:37:19
 * @Description: 公用方法提取
 * @FilePath: \sy_kjxc_web\src\utils\common.js
 */

export function GetQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  let r = window.location.search.substr(1).match(reg);
  if (r !== null) return unescape(r[2]);
  return null;
}

/**
 * 将单位为s的时间格式为：0h0′0″
 * @param {Number} val 秒数
 */
export function formateTime (val) {
  if (val > 0) {
    if (val / 60 / 60 > 1) {
    // 有分钟
      let hour = Math.floor(val / 60 / 60);
      let minite = Math.floor((val - 3600 * hour) / 60);
      let second = Math.floor(val - 3600 * hour - 60 * minite);
      return hour + 'h' + minite + '′' + (second ? second + '″' : '');
    } else {
      let minite = Math.floor(val / 60);
      let second = Math.floor(val - 60 * minite);
      return minite + '′' + (second || '');
    }
  } else {
    return 0;
  }
}
