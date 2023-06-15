import { useState } from 'react';
import axios from 'axios';

const useAxiosPut = () => {
	const [data, setData] = useState([]);
	const [putError, setPutError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const putAPICall = async (payload) => {
		try {
			setIsLoading(true);

			const type = payload.id.match('[a-z]*');
			const response = await axios.put(`http://localhost:8080/api/${type}/${payload.id}/update`, payload.payload);

			setData(response.data);
			setPutError(null);

			setIsLoading(false)

		} catch (err) {
			setIsLoading(false)
			setPutError(err.message);
			setData([]);
		}
	}

	return { putAPICall, data, putError, isLoading };
}


export default useAxiosPut;
