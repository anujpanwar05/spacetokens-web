import * as actions from './actionNames'
import callApi from '../../services/ApiService'

export const setAdaLaunchAmount = (ada) => {
  return dispatch => {
    dispatch({ type: actions.SET_ADA_LAUNCH_AMOUNT, payload: ada })
  }
}

export const getAvailableQuantities = () => {
  return dispatch => {
    callApi('/quantity_available', null, 'GET')
      .then(res => dispatch({ type: actions.GET_AVAILABLE_QUANTITIES_SUCCESS, payload: res }))
      .catch(e => {
        dispatch({ 
          type: actions.GET_AVAILABLE_QUANTITIES_FAILED, 
          payload: 'get available quantites failed.'
        })
      })
  }
}

export const getPolicyIds = () => {
  return dispatch => {
    callApi('/policy_ids', null, 'GET')
      .then(res => dispatch({ type: actions.GET_POLICY_IDS_SUCCESS, payload: res }))
      .catch(e => {
        console.log('get policy ids failed.')
      })
  }
}