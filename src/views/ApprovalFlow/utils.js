/* eslint-disable */
import { deepCopy } from '@/utils';
import { APPROVAL_NODE, PAYMENT_NODE, FINANCIAL_NODE, SELECTOR_NODE, ROUTER_NODE, NOTIFY_NODE } from './constant';

// 随机字符串，map生成模板时候生成唯一key
export const randomString = (len) => {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var str = '';
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}

/**
 * 将前端数据结构转换成传给后台数据结构
 */
export const reverseData = (arr) => {
  let idx = 0
  while (idx < arr.length) {
    let item = arr[idx];
    let lineNodes = item.lineNodes
    if (item.node_type === ROUTER_NODE && lineNodes && lineNodes.length > 0) {
      lineNodes.forEach((line, index) => {
        // line.children.splice(0, 1)
        if (index < 9 && line.node_option) {
          if (!line.node_option.includes('0')) {
            /* 补0操作，防止字符串排序bug */
            line.node_option = `优先级0${index + 1}`
          }
        }
        line.node_seq = idx
      })
      arr.splice(idx, 1, ...reverseData(lineNodes))
    } else {
      if (item.node_type != SELECTOR_NODE) {
        item.node_seq = idx;
      }
    }
    if (item.child_nodes && item.child_nodes.length > 0) {
      reverseData(item.child_nodes)
    }
    idx++
  }
  return arr
}

/**
 * 将后台数据结构转换成前端数据结构
 */
export const formatData = (arr) => {
  arr.forEach((item, index) => {
    item.key = randomString()
    if (item.node_type === SELECTOR_NODE) {
      arr.splice(index, 0, {
        node_type: ROUTER_NODE,
        key: randomString(),
        lineNodes: [
          ...arr.splice(index, findSameSelectorNodeLength(arr, item.node_seq))
        ]
      })
      arr[index].lineNodes = sortData(arr[index].lineNodes)
      arr[index].lineNodes = removeZero(arr[index].lineNodes)
      arr[index].lineNodes.forEach((node, idx) => {
        node.key = randomString()
        if (idx == arr[index].lineNodes.length - 1) {
          node.default = true
        }
        node.child_nodes = node.child_nodes || []
        formatData(node.child_nodes)
      })
    }
  })
  return arr
}

/**
 * 将child_nodes重新排序，解决字符串比大小出现的问题
 */
export const sortData = (arr) => {
  if (arr) {
    let rlt = deepCopy(arr)
    rlt.sort((a, b) => {
      let aPriority = a.node_option.replace('优先级', '')
      let bPriority = b.node_option.replace('优先级', '')
      return (+aPriority) - (+bPriority)
    })
    return rlt
  }
}

/**
 * node_option去0操作
 */
export const removeZero = (arr) => {
  if (arr) {
    let rlt = deepCopy(arr)
    let length = arr.length > 9 ? 9 : arr.length
    // 前9位去掉0
    for(let i = 0; i < length; i++) {
      rlt[i].node_option = rlt[i].node_option.replace('0', '')
    } 
    return rlt
  }
}

function findSameSelectorNodeLength(arr, seq) {
  return arr.filter(item => {
    return item.node_type === SELECTOR_NODE && item.node_seq === seq
  }).length
}

// 重置优先级
export const resetPriority = (arr) => {
  arr.forEach((item, index) => {
    item.node_option = `优先级${index + 1}`
  })
}

/**
 * 检查数组里面包含哪些节点
 */
export const checkNodeMap = (arr) => {
  let defaultMap = []
  const checkMap = (arr) => {
    let approvalFlag = arr.some(child => child.node_type == APPROVAL_NODE);
    let financialFlag = arr.some(child => child.node_type == FINANCIAL_NODE);
    let paymentFlag = arr.some(child => child.node_type == PAYMENT_NODE);
    let routerIndex = arr.findIndex(child => child.node_type == ROUTER_NODE);
    approvalFlag && defaultMap.push(APPROVAL_NODE);
    financialFlag && defaultMap.push(FINANCIAL_NODE);
    paymentFlag && defaultMap.push(PAYMENT_NODE)
    if (routerIndex >= 0) {
      arr[routerIndex].lineNodes.forEach(line => {
        checkMap(line.child_nodes);
      })
    }
  }
  checkMap(arr);
  return defaultMap
}

// 找到数组是否有出纳节点
export const includePaymentNode = (arr) => {
  let flag = false
  return arr.some(item => {
    if (item.node_type === ROUTER_NODE) {
      item.lineNodes.forEach((line) => {
        flag = includePaymentNode(line.child_nodes)
      })
      return flag
    } else {
      return item.node_type === PAYMENT_NODE
    }

  })
}
// 找到出纳节点在哪个下标
export const findIndex4paymentNode = (arr) => {
  let flag = false;
  return arr.findIndex(data => {
    if (data.node_type === ROUTER_NODE) {
      data.lineNodes.forEach((line) => {
        flag = includePaymentNode(line.child_nodes)
      })
      return flag;
    } else {
      return data.node_type === PAYMENT_NODE
    }
  })
}
