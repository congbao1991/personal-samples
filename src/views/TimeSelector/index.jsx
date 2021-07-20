import React from 'react'
import TimePeriodSelector from '@congbao/time-period-selector'
import '@congbao/time-period-selector/lib/main.min.css'

import './index.less'

function TimeSelector() {

  return (
    <div className="time-selector-container">
      <div className="time-selector">
        <TimePeriodSelector onSelectionFinish={(items) => { console.log(items) }} />
      </div>
    </div>
  )
}

export default TimeSelector
