import { ADD_COMPONENT, UPDATE_COMPONENT_SUCC } from '../constants';

let initialState = {
  componentList: [],
}

export default (state = initialState, { type, payload }) => {
  let newState
  switch (type) {
    case ADD_COMPONENT:
      newState = JSON.parse(JSON.stringify(state));
      newState.componentList.push(payload.component)
      return newState;
    case UPDATE_COMPONENT_SUCC:
      newState = JSON.parse(JSON.stringify(state));
      const { id, style } = payload
      const index = newState.componentList.findIndex(component => component.id == id);
      newState.componentList[index].style = Object.assign({}, newState.componentList[index].style, style)
      return newState;
    default:
      return state;
  }
}