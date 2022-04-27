import { store } from '../store'
import { fetchNewSpacePermitDetails } from './actions'
import moment from 'moment'

let depositAddressTimeout = null

export const getSpacePermitID = () => {
  const spacepermit = store.getState().spacepermit
  return spacepermit?.permitCode
}

export const getSpacePermitQuery = () => {
  const spacepermit = store.getState().spacepermit
  const query = '?space_permit_code=' + spacepermit?.permitCode
  return query
}

export const getDepositAddress = () => {
  const spacepermit = store.getState().spacepermit
  const nowUTCMinusOneHour = moment(new Date().toUTCString()).subtract(1, 'h')
  let depositAddress = spacepermit?.expeditions.find(e => {
    // console.log("time tests:", moment(e.space_tokens_address_last_seen_at).format(), nowUTCMinusOneHour.format(), moment(e.space_tokens_address_last_seen_at).isBefore(nowUTCMinusOneHour))
    return e.founder_address == null &&
    (e.space_tokens_address_last_seen_at == null ||
      moment(e.space_tokens_address_last_seen_at).isBefore(nowUTCMinusOneHour))
  })?.space_tokens_address
  return depositAddress
}

export const getExpeditionStatus = (address) => {
  const spacepermit = store.getState().spacepermit
  return spacepermit?.expeditions.find(exp => exp.space_tokens_address === address)?.expedition_status
}

export const getExpeditionDetailByAddress = (address) => {
  const spacepermit = store.getState().spacepermit
  return spacepermit?.expeditions.find(exp => exp.space_tokens_address === address)
}
