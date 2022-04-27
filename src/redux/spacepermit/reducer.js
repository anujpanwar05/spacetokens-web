import * as actions from './actionNames'

const initialState = {
  permitCode: null,
  inUse: false,
  expeditions: [],
  loading: false,
  fetchingNewSpacePermitDetails: false,
  error: null,
  permitCodeError: '',
  seenPaymentAddresses: []
}
// TODO:// review me, our returned space permits have been beefed up!
export default function reducer (state = initialState, action) {
  switch (action.type) {
      case actions.FETCH_SPACE_PERMIT_STARTED:
        return {
          ...state,
          loading: true
        }
      case actions.FETCH_SPACE_PERMIT_SUCCESS:
        const { permit_code, in_use, details } = action.payload
        return {
          ...state,
          permitCode: permit_code,
          inUse: in_use,
          expeditions: details,
          loading: false
        }
      case actions.FETCH_SPACE_PERMIT_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        }
      case actions.OVERWRITE_SPACE_PERMIT_ID_ERROR:
        return {
          ...state,
          permitCodeError: action.payload
        }
      case actions.ADD_SEEN_PAYMENT_ADDRESS:
        let addresses = []
        state.seenPaymentAddresses.forEach(addr => {
          addresses.push(addr)
        })
        if (!addresses.includes(action.payload)) {
          addresses.push(action.payload)
          return {
            ...state,
            seenPaymentAddresses: addresses
          }
        } else {
          return {
            ...state
          }
        }
    case actions.FETCH_NEW_SPACE_PERMIT_DETAILS_STARTED:
      return {
        ...state,
        fetchingNewSpacePermitDetails: true
      }
    case actions.FETCH_NEW_SPACE_PERMIT_DETAILS_SUCCESS:
      return {
        ...state,
        permitCode: action.payload.permit_code,
        inUse: action.payload.in_use,
        expeditions: action.payload.details,
        fetchingNewSpacePermitDetails: false
      }
    case actions.FETCH_NEW_SPACE_PERMIT_DETAILS_ERROR:
      return {
        ...state,
        fetchingNewSpacePermitDetails: false
      }
    default:
      return state;
  }
}
