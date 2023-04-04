import { React, useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./components/TaskCard/TaskCard";
import { Container, Grid, Stack, Box, Toolbar } from "@mui/material";
import Appbar from "./components/Appbar/Appbar"
import BottomAppBar from "./components/BottomAppbar/BottomAppbar";
import Calendar from "./components/Calendar/Calendar"
import NavBar from "./components/NavBar/NavBar";
import TaskContainer from "./components/TaskContainer/TaskContainer";




export default function App() {


	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get('http://localhost:8080/api/list/all')
				if (response.status !== 200) {
					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					);
				}
				setData(response.data);
				setError(null);
			} catch (err) {
				setError(err.message);
				setData(null);
			} finally {
				setLoading(false);
			}
		}
		getData()
	}, [])

	return (
		<div className="App">
			<Appbar />
			<Stack direction="row" spacing={2} justifyContent="space-between">
				<Box flex={1} padding={2} sx={{ flexGrow: "1" }}>
					<NavBar data={data} />
				</Box>
				<Box flex={2} padding={2} sx={{ flexGrow: "1" }}>
					<TaskContainer />
				</Box>
				<Box flex={5} padding={2} sx={{ flexGrow: "1" }}>
					<Calendar />
				</Box>
			</Stack>
			<BottomAppBar />
		</div >
	);
}
