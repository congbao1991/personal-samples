import { takeEvery, put } from 'redux-saga/effects'
import { UPDATE_COMPONENT } from '../constants'
import { updateComponentSucc } from '@/store/actions'


function* updateComponentSaga({ payload }) {
  yield put(updateComponentSucc(payload))
}


// generator 函数
function* updateComponentWatcher() {
  yield takeEvery(UPDATE_COMPONENT, updateComponentSaga);
}
export default [
  updateComponentWatcher
];