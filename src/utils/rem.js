/**
 * @Author：huyibin
 * @Date：2019/11/29 13:54
 * @Description：rem适配  1rem = 100px
 **/
export function setRem () {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  let htmlDom = document.getElementsByTagName('html')[0]
  htmlDom.style.fontSize = htmlWidth / 1920 * 100 + 'px'
}
setRem()
window.onresize = function () {
  setRem()
}
