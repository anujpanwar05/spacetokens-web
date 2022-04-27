import { SCAN_URL } from '../config/environment'
import moment from 'moment'

export const cardanoScanUrl = (address) => {
  let url = SCAN_URL + address
  return url
}

export const MINUTE_BUFFER = 2

export const timeLeft = (startedAt, duration) => {
  let start = moment(startedAt)
  let end = start.add(duration, 'minutes')
  let now = moment()
  let diff = end.diff(now, 'minutes')
  return diff
}
