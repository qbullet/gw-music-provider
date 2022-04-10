import axios from 'axios'
import humps from 'humps'

class HttpRequest {

  constructor (url = `${process.env.REACT_APP_GW_MUSIC_PROVIDER_API}`) {
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.axiosInstance.interceptors.request.use((config) => ({
      ...config,
      data: config.data ? humps.decamelizeKeys(config.data) : config.data,
      params: config.params ? humps.decamelizeKeys(config.params) : config.params
    }), (error) => Promise.reject(error))

    this.axiosInstance.interceptors.response.use(
      (response) => humps.camelizeKeys(response.data),
      (error) => {
        const newError = new Error(error)
        if (error?.response) {
          return Promise.reject(error.response.data)
        }
        const errorFail = {
          code: 503,
          message: newError.message
        }
        throw errorFail
      }
    )
  }

  setHeader ({ key, value }) {
    if (key && value) {
      this.axiosInstance.defaults.headers.common[key] = value
    }
  }

  get (endpoint, data, config) {
    return this.axiosInstance.get(endpoint, { params: data, ...config })
  }

  post (endpoint, data, config) {
    return this.axiosInstance.post(endpoint, data, config)
  }

  put (endpoint, data, config) {
    return this.axiosInstance.put(endpoint, data, config)
  }

  patch (endpoint, data, config) {
    return this.axiosInstance.patch(endpoint, data, config)
  }

  delete (endpoint, data, config) {
    return this.axiosInstance.delete(endpoint, { params: data, ...config })
  }
}

export default HttpRequest
