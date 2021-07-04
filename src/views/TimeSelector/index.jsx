import React from 'react'
import TimePeriodSelector from '@congbao/time-period-selector'
import '@congbao/time-period-selector/lib/main.min.css'

function TimeSelector() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{display: 'inline-block', marginTop: 50, textAlign: 'left'}}>
        <TimePeriodSelector className="time-selector" onSelectionFinish={items => console.log(items)} />
      </div>
    </div>
  )
}

export default TimeSelector
