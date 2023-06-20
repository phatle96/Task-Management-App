import axios from 'axios';

const useAxiosPut = () => {

	const axiosPut = async (payload) => {
		try {

			const type = payload.id.match('[a-z]*');
			const response = await axios.put(`http://localhost:8080/api/${type}/${payload.id}/update`, payload.payload);

			return { code: response.status, response: response.data };


		} catch (err) {

			return { code: 'error', response: err };

		}
	}

	return { axiosPut }
}



export default useAxiosPut;
