import React from 'react'
import CustomDuration from '../custom-duration'
import './index.less'

const defProp = {
  form: {
    placeholder: '请选择',
    start_time_label: '开始时间',
    end_time_label: '结束时间',
  }
}
function TravelItinerary(props) {
  const componentData = props.componentData || { form: {} }
  componentData.form = Object.assign({}, componentData.form, defProp.form)
  return (
    <div className="travel-itinerary">
      <div className="travel-itinerary-section">
        <div>请选择起始地</div>
        <div className="section-icon">
          <img src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/wbx-qwapp/apply/travel/route.svg" />
        </div>
        <div>请选择目的地</div>
      </div>
      <CustomDuration noBorder componentData={componentData} />
    </div>
  )
}

export default TravelItinerary
