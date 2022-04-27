import callApi from '../../services/ApiService'
import * as actions from './actionNames'
import { getSpacePermitID, getExpeditionDetailByAddress } from './selectors'

export const getSpacePermit = () => {
  return dispatch => {
    let url = getSpacePermitUrl('/space_permit')
    dispatch({ type: actions.FETCH_SPACE_PERMIT_STARTED })
    callApi(url, null, 'GET')
      .then(res => dispatch({ type: actions.FETCH_SPACE_PERMIT_SUCCESS, payload: res }))
      .catch(e => {
        dispatch({ type: actions.FETCH_SPACE_PERMIT_ERROR, 
          payload: { error: e, message: 'Unable to fetch space permit, please try again.' }})
      })
  }
}

export const fetchNewSpacePermitDetails = () => {
  return dispatch => {
    if(getSpacePermitID() === null) {
      console.log('Space Permit Doesn\'t exist!')
      return
    }
    let url = getSpacePermitUrl('/new_space_permit_details')
    dispatch({ type: actions.FETCH_NEW_SPACE_PERMIT_DETAILS_STARTED })
    callApi(url, null, 'GET')
      .then(res => dispatch({ type: actions.FETCH_NEW_SPACE_PERMIT_DETAILS_SUCCESS, payload: res }))
      .catch(e => {
        dispatch({ type: actions.FETCH_NEW_SPACE_PERMIT_DETAILS_ERROR, 
          payload: { error: e, message: 'Unable to fetch new space permit details, please try again.' }})
      })
  }
}

export const setPaymentDetailsAddressAsSeen = (address) => {
  return dispatch => {
    const detail = getExpeditionDetailByAddress(address)
    callApi('/current_datetime', null, 'GET')
      .then(res => {
        // console.log("current_server_time:", res)
        detail.space_tokens_address_last_seen_at = res
        const body = { permit_code: getSpacePermitID(), details: [detail] }
        // patch detail with latest seen date
        callApi('/space_permit_last_seen', body, 'PATCH')
          .then(res => { 
            dispatch({ type: actions.FETCH_SPACE_PERMIT_SUCCESS, payload: res })
          })
          .catch(e => {
            dispatch({ type: actions.FETCH_SPACE_PERMIT_ERROR,
              payload: { error: e, message: 'Unable to path space permit detail seen date.' }})
          })
      })
  }
}

const getSpacePermitUrl = (url) => {
  const spacePermitCode = getSpacePermitID()
  if(spacePermitCode != null) {
    return url + '?space_permit_code=' + spacePermitCode
  } else {
    return url
  }
}

export const overwriteSpacePermitID = (spacePermitCode) => {
  return dispatch => {
    if(spacePermitCode.length !== 11) {
      dispatch({ type: actions.OVERWRITE_SPACE_PERMIT_ID_ERROR, payload: 'Space Permit ID not formatted correctly' })
      return
    }
    let url = '/space_permit?space_permit_code=' + spacePermitCode
    callApi(url, null, 'GET')
      .then(res => {
        if(res.permit_code != null) {
          dispatch({ type: actions.FETCH_SPACE_PERMIT_SUCCESS, payload: res })
          dispatch({ type: actions.OVERWRITE_SPACE_PERMIT_ID_ERROR, payload: '' })
        } else {
          dispatch({ type: actions.OVERWRITE_SPACE_PERMIT_ID_ERROR, payload: 'Space Permit ID not formatted correctly' })
        }
      })
      .catch(e => {
        dispatch({ type: actions.OVERWRITE_SPACE_PERMIT_ID_ERROR, payload: 'Space Permit ID doesn\'t exist!' })
      })
  }
}

export const resetSpacePermitError = () => {
  return dispatch => {
    dispatch({ type: actions.OVERWRITE_SPACE_PERMIT_ID_ERROR, payload: '' })
  }
}

export const addSeenPaymentAddress = (address) => {
  return dispatch => {
    dispatch({ type: actions.ADD_SEEN_PAYMENT_ADDRESS, payload: address })
  }
}