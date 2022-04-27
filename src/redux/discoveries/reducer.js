import * as actions from './actionNames'

const initialState = {
  loading: false,
  error: {},
  discoveries: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_DISCOVERIES_STARTED:
      return {
        ...state,
        loading: true,
        error: {},
      }
    case actions.FETCH_DISCOVERIES_SUCCESS:
      return {
        ...state,
        loading: false,
        discoveries: action.payload.filter(f => f.discoveries[0]).map(exp => {
          const { name, image_url, discovery_attributes, minted_transaction_hash, 
            discovery_no, transaction_viewer_url } = exp.discoveries[0]
          let discovery = {
            date: exp.last_checkin_at,
            name: name,
            imgUrl: image_url,
            price: exp.amount_paid,
            minted_transaction_hash: minted_transaction_hash,
            size: discovery_attributes.planet_size,
            type: discovery_attributes.planet_type,
            class: discovery_attributes.planet_class,
            transaction_viewer_url: transaction_viewer_url,
            discoveryNo: discovery_no
          }
          return discovery
        }).sort((a, b) => new Date(b.date) - new Date(a.date))
      }
    case actions.FETCH_DISCOVERIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state;
  }
}
