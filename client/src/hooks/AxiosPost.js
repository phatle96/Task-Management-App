import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

const AxiosPost = ({ type, payload, setIsSubmit }) => {
	const [data, setData] = useState([]);
	const [postError, setPostError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isComplete, setIsComplete] = useState(false)

	const postData = async (type, payload, setIsSubmit) => {
		try {
			setIsLoading(true);

			const response = await axios.post(`http://localhost:8080/api/${type}/create`, payload.payload);

			setData(response.data);
			setPostError(null);

			setIsLoading(false);
			setIsSubmit(false);
			setIsComplete(true)

		} catch (err) {
			setIsLoading(false)

			setPostError(err.message);
			setData([]);
			setIsSubmit(false);
			setIsComplete(true)
		}
	}

	useEffect(postData(type, payload, setIsSubmit), [setIsSubmit])

	return (
		<>
			{!data.length ? (
				<Snackbar open={isComplete} autoHideDuration={3000} >
					<Alert severity="success" sx={{ width: '100%' }}>
						Success
					</Alert>
				</Snackbar>
			) : (
				<Snackbar open={isComplete} autoHideDuration={3000}>
					<Alert severity="error" sx={{ width: '100%' }}>
						False
					</Alert>
				</Snackbar>
			)}
		</>
	);
}

export default AxiosPost;
