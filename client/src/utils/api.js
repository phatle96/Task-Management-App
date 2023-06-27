import axios from "axios";

export const axiosFetch = async (url) => {
    let response
    const controller = new AbortController();

    try {
        response = await axios.get(url, {
            signal: controller.signal
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

export const axiosPost = async (type, payload) => {
    let response
    try {

        response = await axios.post(`http://localhost:8080/api/${type}/create`, payload.payload);

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
        response = await axios.put(`http://localhost:8080/api/${type}/${payload.id}/update`, payload.payload);

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
        response = await axios.delete(`http://localhost:8080/api/${type}/${payload.id}/delete`);

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error({ error: response.status, response: response.data });
        }

    } catch (err) {
        return Promise.reject(err.message ? err.message : response);
    }
}