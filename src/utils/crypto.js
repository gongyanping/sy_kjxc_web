/*
 * @Author: chenminggui
 * @Date: 2019-12-11 17:21:34
 * @Last Modified by: chenminggui
 * @Last Modified time: 2020-01-06 11:11:27
 * @Desc 登录时的加密js工具
 */

import CryptoJS from 'crypto-js/crypto-js'

// 默认的 KEY 与 iv (如果没有给)
const KEY = CryptoJS.enc.Utf8.parse('zwfwsx@.auth$lxx')
const IV = CryptoJS.enc.Utf8.parse('zwfwsx@.auth$lxx')
/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt (word, keyStr, ivStr) {
  let key = KEY
  let iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }

  let srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function Decrypt (word, keyStr, ivStr) {
  let key = KEY
  let iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }

  let base64 = CryptoJS.enc.Base64.parse(word)
  let src = CryptoJS.enc.Base64.stringify(base64)

  var decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
