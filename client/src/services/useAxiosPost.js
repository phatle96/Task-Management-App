import axios from 'axios';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';

const useAxiosPost = () => {

	const { reFetchTasks, setReFetchTasks } = useContext(DataContext);

	const axiosPost = async (type, payload) => {
		try {

			const response = await axios.post(`http://localhost:8080/api/${type}/create`, payload.payload);

			//setReFetchTasks(!reFetchTasks);

			return { code: response.status, response: response.data };

		} catch (err) {

			return { code: 'error', response: err };

		};
	}

	return { axiosPost }

}



export default useAxiosPost;