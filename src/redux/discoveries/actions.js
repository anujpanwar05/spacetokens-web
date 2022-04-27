import callApi from '../../services/ApiService'
import * as actions from './actionNames'
import * as appActions from '../application/actionNames'
import { availableQuantities } from '../application/selectors'

export const fetchDiscoveries = () => {
  return dispatch => {
    callApi('/quantity_available', null, 'GET')
      .then(res => {
        dispatch({ type: appActions.GET_AVAILABLE_QUANTITIES_SUCCESS, payload: res })
        let limit = availableQuantities()?.purchased_count 
        limit = limit ? limit : 250
        let skip = Math.max((limit - 72), 0)
        dispatch({ type: actions.FETCH_DISCOVERIES_STARTED })
        const query = `?skip=${skip}&limit=${limit}`
        callApi('/completed_expeditions' + query, null, 'GET')
          .then(res => dispatch({ type: actions.FETCH_DISCOVERIES_SUCCESS, payload: res }))
          .catch(e => {
            dispatch({ type: actions.FETCH_DISCOVERIES_ERROR, 
              payload: { error: e, message: 'Unable to fetch discoveries, please try again.' }})
          })
      })
      .catch(e => {
        dispatch({ 
          type: appActions.GET_AVAILABLE_QUANTITIES_FAILED, 
          payload: 'get available quantites failed.'
        })
      })

    
  }
}
