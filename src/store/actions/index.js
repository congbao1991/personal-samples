import { ADD_COMPONENT, UPDATE_COMPONENT, UPDATE_COMPONENT_SUCC, SET_CUR_COMPONENT_ID, UPDATE_PREVIEW_STATUS } from '../constants'

export const addComponent = payload => ({
  type: ADD_COMPONENT,
  payload
})

export const updateComponent = payload => ({
  type: UPDATE_COMPONENT,
  payload
})

export const updateComponentSucc = payload => ({
  type: UPDATE_COMPONENT_SUCC,
  payload
})


export const setCurComponentID = payload => ({
  type: SET_CUR_COMPONENT_ID,
  payload
})

export const updatePreviewStatus = payload => ({
  type: UPDATE_PREVIEW_STATUS,
  payload
})
