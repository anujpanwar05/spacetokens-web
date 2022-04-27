import { store } from '../store'

export const availableQuantities = () => {
  const application = store.getState().application
  return application?.availableQuantities
}

export const firstPolicy = () => {
  const application = store.getState().application
  const policies = application?.policyIds
  return policies.length ? policies[0] : 'not available'
}