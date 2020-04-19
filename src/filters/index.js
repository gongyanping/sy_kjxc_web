
/**
 * 字符串裁剪
 * @param {String} value 目标字符串
 * @param {number} len 长度
 */
export function sliceStr (value, len = 50) {
  if (value && value.length > len) {
    return value.slice(0, len) + '......'
  }
  return value
}

/**
 * 转换容量单位，原始单位为b
 * @param {Number} bytes 原数值
 */
export function bytesToSize (bytes) {
  if (bytes === 0) return '0 B';
  let k = 1024;
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

