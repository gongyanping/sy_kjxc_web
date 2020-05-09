/*
 * @Author: gyp
 * @Date: 2020-05-09 18:16:42
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-09 18:44:40
 * @Description: 公用方法提取
 * @FilePath: \sy_kjxc_web\src\utils\common.js
 */

export function GetQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  let r = window.location.search.substr(1).match(reg);
  if (r !== null) return unescape(r[2]);
  return null;
}
