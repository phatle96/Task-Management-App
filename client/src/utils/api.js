import axios from "axios";

axios.defaults.baseURL = 'https://demo-task-management.onrender.com/api';

const dateKeyRx = /_date/i;

export const axiosFetch = async (url) => {
    let response

    try {
        response = await axios({
            url: url,
            method: 'get',
            transformResponse:
                [
                    (data) =>
                        JSON.parse(data, (key, value) =>
                            dateKeyRx.test(key) ? (value ? new Date(value) : value) : value),
                ],

        });

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error({ error: response.status, response: response.data });
        }

    } catch (err) {
        return Promise.reject(err.message ? err.message : response);
    }
}

export const axiosPost = async (payload) => {
    let response
    try {

        response = await axios({
            url: `/${payload.type}/create`,
            method: 'post',
            data: payload.payload,
            transformResponse:
                [
                    (data) =>
                        JSON.parse(data, (key, value) =>
                            dateKeyRx.test(key) ? (value ? new Date(value) : value) : value),
                ],
        })

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error({ error: response.status, response: response.data });
        }

    } catch (err) {
        return Promise.reject(err.message ? err.message : response.data);
    }
}

export const axiosPut = async (payload) => {
    let response
    try {

        const type = payload.id.match('[a-z]*');
        const option = payload.option ? (payload.option + '/') : ''
        response = await axios({
            url: `/${type}/${payload.id}/update/${option}`,
            method: 'put',
            data: payload.payload,
            transformResponse:
                [
                    (data) =>
                        JSON.parse(data, (key, value) =>
                            dateKeyRx.test(key) ? (value ? new Date(value) : value) : value),
                ],
        })

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error({ error: response.status, response: response.data });
        }

    } catch (err) {
        return Promise.reject(err.message ? err.message : response);
    }
}

export const axiosDelete = async (payload) => {
    let response
    try {

        const type = payload.id.match('[a-z]*');
        response = await axios.delete(`/${type}/${payload.id}/delete`);

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error({ error: response.status, response: response.data });
        }

    } catch (err) {
        return Promise.reject(err.message ? err.message : response);
    }
}