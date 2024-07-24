import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost' })

api.defaults.withCredentials = true
api.defaults.withXSRFToken = true

export { api }
