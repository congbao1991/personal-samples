import { ADD_COMPONENT, UPDATE_COMPONENT, UPDATE_COMPONENT_SUCC } from '../constants';

export const addComponent = (payload) => ({
  type: ADD_COMPONENT,
  payload
})

export const updateComponent = (payload) => ({
  type: UPDATE_COMPONENT,
  payload
})

export const updateComponentSucc = (payload) => ({
  type: UPDATE_COMPONENT_SUCC,
  payload
})
