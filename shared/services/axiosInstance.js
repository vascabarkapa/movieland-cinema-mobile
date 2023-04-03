import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://192.168.100.86:5001/api/`,
});

axiosInstance.interceptors.request.use((confiq) => {
    confiq.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    return confiq;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance;