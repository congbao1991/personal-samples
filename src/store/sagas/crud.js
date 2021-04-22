import { takeEvery, put } from 'redux-saga/effects'
import { updateComponentSucc } from '@/store/actions'
import { UPDATE_COMPONENT } from '../constants'


function* updateComponentSaga({ payload }) {
  yield put(updateComponentSucc(payload))
}


// generator 函数
function* updateComponentWatcher() {
  yield takeEvery(UPDATE_COMPONENT, updateComponentSaga);
}
export default [
  updateComponentWatcher
]
