/* eslint-disable */

/**
 * 判断浏览器版本
 * @returns {*}  -1，不是ie浏览器。11，IE11。
 * @constructor
 */
export function getIEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
          return 7;
      } else if (fIEVersion == 8) {
          return 8;
      } else if (fIEVersion == 9) {
          return 9;
      } else if (fIEVersion == 10) {
          return 10;
      } else {
          return 6; //IE版本<=7
      }
  } else if (isEdge) {
      return 'edge'; //edge
  } else if (isIE11) {
      return 11; //IE11
  } else {
      return -1; //不是ie浏览器
  }
}


/*判断客户端*/
export const judgeClient = () => {
  let u = navigator.userAgent;
  console.log('u',u)
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
  if(isAndroid){
      return 'Android';
  }else if(isIOS){
      return 'IOS';
  }else{
      return 'PC';
  }
}

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function rangeArray(len) {
  return Array.from(Array(len).keys())
}

/**
* 合并数组并去重
* @param  {Array} args 需要合并的数组
* @return {Array}         返回合并后的数组
*/
export function concatArray(...args) {
  const arr = Array.prototype.concat.apply([], args)
  return Array.from(new Set(arr))
}

export function trim(str) {
  return typeof str === 'string' ? str.replace(/(^\s*)|(\s*$)/g, "") : str
}

export function hasScrollbar() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
}

/**
* urlToList
* /userinfo/2144/id => ['/userinfo', '/useinfo/2144', '/userindo/2144/id']
* @param  {String} url
* @return {Array}
*/
export function urlToList(url) {
  const urls = url.split('/').filter(i => i)
  return urls.map((urlItem, index) => `/${urls.slice(0, index + 1).join('/')}`)
}

/**
* 获取字符串长度，中文+2
*/
export function getStringLength(str) {
  if (!str || typeof str !== 'string') {
      return 0
  }
  return str.replace(/[^\x00-\xff]/g, '01').length
}

/**
* antd Form Validator
* 字符长度校验，中文按2位计算，并且判断是否为required
* @param  {Number}   length   最大长度
* @param  {Object}   rule     原validator rule
* @param  {String}   value    原validator value
* @param  {Function} callback 原validator callback
*/
export function validateStringLength(rule, value, callback) {
  if ((rule.required && !trim(value)) || (rule.length && getStringLength(value) > rule.length)) {
      callback(rule.message)
  }
  callback()
}

/**
* @param {any} obj The object to inspect.
* @returns {boolean} True if the argument appears to be a plain object.
*/
export function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
      return false
  }

  // 普通的对象while循环结束后proto的值是：Object.prototype，
  // 通过Object.create(null)生成的对象proto的值是：null
  // 不直接使用 Object.getPrototypeOf(obj) === Object.prototype || Object.getPrototypeOf(obj) === null 判断
  // 是为了防止一些边界情况的出现，如frame访问变量时
  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

/**
* 去除 data 所有的属性值的空格，不考虑深层次属性，主要用于表单提交
*/
export function trimFieldValues(data) {
  if (data && isPlainObject(data)) {
      const newData = {}
      for (let key in data) {
          newData[key] = trim(data[key])
      }
      return newData
  }
  return data
}


// 数字转换成大写汉字
export function digitUppercase(n) {
  var fraction = ['角', '分'];
  var digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(shiftRight(n, 1 + i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
      var p = '';
      for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(shiftLeft(n, 1));
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  var result = head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整');
  var yIndex = result.indexOf('元')
  var jIndex = result.indexOf('角')
  var fIndex = result.indexOf('分')
  if (jIndex === -1 && yIndex !== -1 && (yIndex < fIndex)){
      result = result.slice(0, yIndex+1) + '零' + result.slice(fIndex-1);
  }
  return result
  // 向右移位
  function shiftRight(number, digit) {
      digit = parseInt(digit, 10);
      var value = number.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] + digit) : digit))
  }
  // 向左移位
  function shiftLeft(number, digit) {
      digit = parseInt(digit, 10);
      var value = number.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] - digit) : -digit))
  }
}


export function secondsFormat(seconds) {
  if (seconds == 0) {
      return ''
  }
  var days = parseInt(seconds / 86400)
  var hours = Math.round(seconds % 86400 / 3600)
  return (days > 0 ? days + '天' : '') + (hours > 0 ? hours + '小时' : '')
}

export function sizeFormat(size = 0) {
  const KB = 1024
  const MB = 1024 * 1024

  if (size / MB > 1) {
      return `${(size / MB).toFixed(2)}MBB`
  } else if (size / KB > 1) {
      return `${(size / KB).toFixed(2)}KB`
  } else {
      return '<1KB'
  }
}

/* 处理时间为开始时间是凌晨 结束时间是当天23：59：59 */
export function formateTime(date = []) {
  if (date && date.length > 0) {
      date[0] = date[0].startOf('day')
      date[1] = date[1].endOf('day')
  }
  return date
}


/**
* 深拷贝
*/
export function deepCopy(obj, cache = []) {
  function find(list, f) {
      return list.filter(f)[0]
  }
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
      return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
      return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
      original: obj,
      copy
  })

  Object.keys(obj).forEach(key => {
      copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
* 通用option过滤器
*/
export const generalOptionFilter = (options, default_value) => {
  return function (input) {
      if (input === '' || input === undefined || input === null) {
          return ''
      }
      const val = options.find(opt => opt.value == input);
      if (val) {
          return val.label
      }
      return default_value || input
  }
}

// 生成随机字符串
export const randomString = (len) => {
  len = len || 16;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var str = '';
  for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}

/**
* 单位转换
* @returns {{px2cm(*): *, cm2px(*): number, mm2px(*): number, pX2mm(*): number}|number}
*/
export const changeUnit = ()=> {
  let ratio = 0;
  let div = document.createElement("div");
  div.style.width = '1cm';
  div.id = "puc";
  document.body.appendChild(div);
  let w = getComputedStyle(div, null).width;
  ratio = w.substr(0, w.length - 2);
  div.parentNode.removeChild(div);
  return {
      px2cm (px) {
          return Math.round(px * 10 / ratio) / 10;
      },
      pX2mm (px) {
          let r = ratio / 10;
          return Math.round(px / r);
      },
      cm2px (cm) {
          return Math.round(cm * ratio);
      },
      mm2px (mm) {
          let r = ratio / 10;
          return Math.round(mm * r);
      }
  }
}



/*
* 移除url中的某个参数
* */

export const removeURLParameter = (url, parameter = []) => {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {
      const prefix = []
      parameter.forEach(i => {prefix.push(encodeURIComponent(i) + '=')})
      let pars = urlparts[1].split(/[&;]/g);
      console.log(pars, 'parsparspars')
      //reverse iteration as may be destructive
      for (let i = pars.length; i-- > 0;) {
          //idiom for string.startsWith
          const curr = pars[i]
          prefix.forEach((pre) => { // 目前没想好如何避免两层循环
              if (curr && curr.lastIndexOf(pre, 0) !== -1) {
                  pars.splice(i, 1);
              }
          })
      }

      return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }
  return url;
}

/**
* 数组映射对象
* @param options 映射源
* @param key 键,默认value
* @param val 值,默认整个item
* @returns {key:value}
*/
export function optionsMapping(options, key='value',val){
  return options.reduce((obj,item)=>{
      obj[item[key]] = val ? item[val] : item;
      return obj
  },{})
}

export function setShowAlertEvt(name = '') {
  const isAlertList = localStorage.isShowAlertList ? JSON.parse(localStorage.isShowAlertList) : [];

  if( !(isAlertList.some(e => e === name)) && name) {
      isAlertList.push(name);
  }
  localStorage.setItem('isShowAlertList', JSON.stringify(isAlertList))
}

export function getShowAlertEvt(name = '') {
  const isAlertList = localStorage.isShowAlertList ? JSON.parse(localStorage.isShowAlertList) : [];
  if( name ) {
      return !(isAlertList.some(e => e === name))
  }
  return false
}

export function isEmpty(val) {
  if (val === null || val === undefined) {
      return true;
  }
  return false
}

/**
* 获取字符串分割最后一项
* @param str
* @param separator
* @returns {string}
*/
export function splitLast(str='', separator='/') {
  if (typeof str === 'string') {
      if (!str){
          return ''
      }
      const arr = str.split(separator)
      return arr.pop()
  }
  return ''
}

/**
* 处理自定义单据日期枚举
* @param dateType
* @returns {*}
*/
export function getDateType(dateType = 'YY-MM-DD-hh-mm') {
  return {
      'YY-MM-DD-hh-mm': 'YYYY-MM-DD HH:mm',
      'YY-MM-DD': 'YYYY-MM-DD'
  }[dateType]
}


export function $(selector) {
  return document.querySelector(selector)
}
