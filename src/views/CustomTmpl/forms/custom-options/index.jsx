import React, { useState, useMemo } from 'react'
import { Input, message, Modal } from 'antd'
import { CloseCircleFilled, PlusOutlined, MoreOutlined } from '@ant-design/icons'
import { ReactSortable } from 'react-sortablejs'
import { isEmpty, deepCopy } from '@/utils'

let option_id = new Date().getTime()
let order = 1

function formatOptions(options) {
  return options.map(op => {
    if (op.order > order) {
      order = op.order
    }
    if (!op.option_id) {
      op.option_id = option_id
      option_id++
    }
    return op
  })
}
function CustomOptions({ value = [], onChange, form, form_type }) {
  const [options, setOptions] = useState(formatOptions(value))

  useMemo(() => {
    setOptions(formatOptions(value))
  }, [value])

  const triggerChange = (changedValue = []) => {
    setOptions(changedValue)
    onChange(changedValue)
  }

  const updateList = e => {
    triggerChange(e)
  }

  const onEnd = e => {
    // moveOption({
    //   form_type,
    //   option_id: options[e.newIndex].id,
    //   pre_option_id: options[e.newIndex - 1] ? options[e.newIndex - 1].id : 0
    // })
  }

  const deleteOption = index => {
    if (options.length === 1) {
      Modal.warn({ content: '至少需保留一个选项' })
      return
    }
    const oldOptions = deepCopy(options)
    // if (oldOptions[index].id) {
    //   delOption({
    //     id: oldOptions[index].id,
    //     form_type
    //   })
    // }
    oldOptions.splice(index, 1)
    triggerChange(oldOptions)
  }

  const onAddOption = () => {
    if (options.length === 200) {
      Modal.warn({ content: '最多添加200项' })
      return
    }
    option_id++
    options.push({ label: '', option_id, order: ++order})
    triggerChange(options)
  }

  const onValueChange = (e, index) => {
    options[index].label = e.target.value;
    triggerChange(options)
  }

  const saveOption = (e, index) => {
    if (!e.target.value && isEmpty(options[index].id)) {
      return
    }
    // 检查label是否有重复
    if (options.some((i, idx) => i.label === e.target.value && index !== idx)) {
      message.error({ content: '存在相同的选项，请修改' })
    }
  }

  return (
    <div>
      <ReactSortable list={options}
        group="custom-option"
        setList={updateList}
        onEnd={onEnd}
        handle=".my-handle"
        animation={150}>
        {(value || options).map((i, index) => (
          <div key={i.option_id} style={{ display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10 }}>
            <MoreOutlined className="my-handle" style={{ marginRight: 5,
              cursor: 'move',
              color: '#C0C4CC' }} />
            <Input value={i.label} maxLength={80} onInput={(e) => onValueChange(e, index)} onBlur={e => saveOption(e, index)} style={{ flex: 1 }} />
            <CloseCircleFilled style={{ marginLeft: 5,
              marginRight: 5,
              color: '#C0C4CC' }} onClick={() => deleteOption(index)} />
          </div>
        ))}
      </ReactSortable>
      <PlusOutlined onClick={() => onAddOption()} />
    </div>
  )
}

export default CustomOptions
