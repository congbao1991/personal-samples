import { ADD_COMPONENT, UPDATE_COMPONENT_SUCC, SET_CUR_COMPONENT_ID, UPDATE_PREVIEW_STATUS } from '../constants';

let initialState = {
  componentList: [],
  curComponentID: null,
  previewStatus: false
}

export default (state = initialState, { type, payload }) => {
  let newState
  switch (type) {
    case ADD_COMPONENT:
      newState = JSON.parse(JSON.stringify(state));
      newState.componentList.push(payload.component)
      return newState;
    case SET_CUR_COMPONENT_ID:
      newState = JSON.parse(JSON.stringify(state));
      newState.curComponentID = payload.id
      return newState;
    case UPDATE_PREVIEW_STATUS:
      newState = JSON.parse(JSON.stringify(state));
      newState.previewStatus = payload.status
      return newState;
    case UPDATE_COMPONENT_SUCC:
      newState = JSON.parse(JSON.stringify(state));
      const { style, antdProps, events } = payload
      const index = newState.componentList.findIndex(component => component.id == newState.curComponentID);
      newState.curComponentID && (newState.componentList[index].style = Object.assign({}, newState.componentList[index].style, style))
      newState.curComponentID && (newState.componentList[index].antdProps = Object.assign({}, newState.componentList[index].antdProps, antdProps))
      newState.curComponentID && (newState.componentList[index].events = Object.assign({}, newState.componentList[index].events, events))
      return newState;
    default:
      return state;
  }
}