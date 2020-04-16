import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
})

axiosInstance.interceptors.request.use(
    function (config) {
        const token = window.localStorage.token
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

export const api = {
    get(endpoint) {
        return axiosInstance.get(endpoint)
    },
    post(endpoint, body) {
        return axiosInstance.post(endpoint, body)
    },
    put(endpoint, body) {
        return axiosInstance.put(endpoint, body)
    },
    delete(endpoint) {
        return axiosInstance.delete(endpoint)
    },
    login(body) {
        return axiosInstance.post('/login', body)
    },
    refresh() {
        return axiosInstance.post('/refresh')
    }
}

export function getCep(cep) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}