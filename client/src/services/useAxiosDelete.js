import axios from 'axios';
import { DataContext } from '../context/DataContext';

const useAxiosDelete = () => {

	const axiosDelete = async (payload) => {
		try {

			const type = payload.id.match('[a-z]*');
			const response = await axios.delete(`http://localhost:8080/api/${type}/${payload.id}/delete`);

			return { code: response.status, response: response.data };

		} catch (err) {

			return { code: 'error', response: err };

		}
	}
	return { axiosDelete, }
}
export default useAxiosDelete;
