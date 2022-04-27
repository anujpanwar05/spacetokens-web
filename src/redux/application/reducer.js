import * as actions from './actionNames'

const initialState = {
  adaLaunchAmount: 250,
  availableQuantities: {},
  policyIds: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case actions.SET_ADA_LAUNCH_AMOUNT:
      return {
        ...state,
        adaLaunchAmount: action.payload
      }
    case actions.GET_AVAILABLE_QUANTITIES_SUCCESS:
      // const { purchased_count, available_count, planet_classes_available } = action.payload
      return {
        ...state,
        availableQuantities: action.payload
      }
    case actions.GET_POLICY_IDS_SUCCESS:
      return {
        ...state,
        policyIds: action.payload.ids
      }
    default:
      return state;
  }
}