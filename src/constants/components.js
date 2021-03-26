// 公共样式
export const commonStyle = {
  rotate: 0,
}

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
}

let COMPONENT_LIST =

  [
    {
      name: 'antd-button',
      label: '按钮',
      antdProps: {},
      style: {
        width: 80,
        height: 32,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: 0,
        textAlign: '',
        color: '',
      },
    }
  ]

for (let i = 0, len = COMPONENT_LIST.length; i < len; i++) {
  const item = COMPONENT_LIST[i]
  item.style = { ...commonStyle, ...item.style }
  COMPONENT_LIST[i] = { ...commonAttr, ...item }
}

export default COMPONENT_LIST