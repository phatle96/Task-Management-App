import { useState } from 'react';
import axios from 'axios';

const useAxiosDelete = () => {
	const [data, setData] = useState([]);
	const [deleteError, setDeleteError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const deleteAPI = async (payload) => {
		try {
			setIsLoading(true);

			const type = payload.id.match('[a-z]*');
			const response = await axios.delete(`http://localhost:8080/api/${type}/${payload.id}/delete`);

			setData(response.data);
			setDeleteError(null);

			setIsLoading(false)

		} catch (err) {
			setIsLoading(false)
			setDeleteError(err.message);
			setData([]);
		}
	}

	return { deleteAPI, data, deleteError, isLoading };
}


export default useAxiosDelete;
