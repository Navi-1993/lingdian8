'use strict'
/**
 * @Description: 版本转化code
 * @param {String} code
 * @return: Number // 1007021
 */
export function versioncodeFormat (code) {
  if (!code) {
    return 0
  }
  return Number(code.split('.').map(i => i.padStart(3, '0')).join().replace(/,/g, ''))
}