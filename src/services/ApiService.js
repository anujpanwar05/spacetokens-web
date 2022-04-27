import { API_URL, API_KEY } from '../config/environment';

export default async function callApi (endPoint, payload = {}, method = 'POST', headers = {}) {
    const requestOptions = {
        method: method,
        headers: {
            ...apiKey(),
            'accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        }
    }
    if (method === 'POST' || method === 'PATCH') { requestOptions.body = JSON.stringify(payload) }
    var url = `${API_URL}${endPoint}`
    // console.log(url)
    
    // eslint-disable-next-line no-undef
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
        throw await response.json()
    }
    return response.json()
}

export function apiKey () {
  return { "api-key": API_KEY }
}
