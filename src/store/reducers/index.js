import { combineReducers } from 'redux'

import crud from './crud'                             // 增删改查

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer() {
  return combineReducers({
    crud
  })
}