import { React } from "react";
import { Box,Stack, } from "@mui/material";
import Appbar from "./components/Appbar/Appbar"
import BottomAppBar from "./components/BottomAppbar/BottomAppbar";
import NavBar from "./components/NavBar/NavBar";
import TabGroup from "./components/TabGroup/TabGroup";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ListTitle from "./components/ListTitle/ListTitle";
import { BrowserRouter as Router, } from 'react-router-dom'

export default function App() {
	return (
		<Router>
			<Box position="fixed" justifyContent="space-between" sx={{ width: '100%' }}>
				<Stack direction="row" >
					<NavBar />
					<Box overflow='auto' height='100vh' sx={{ width: '100%' }}>
						<Stack direction="column">
							<Box >
								<ListTitle />
							</Box>
							<Grid2 container >
								<Grid2 xs={12} sm={12} md={12} lg={12}
									sx={{ display: { xs: "block", sm: "block", md: "block", lg: "block" }, /* backgroundColor: "error.main"  */ }}>
									<TabGroup />
								</Grid2>
							</Grid2>
						</Stack>
					</Box>
				</Stack>
				<Box sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" }, /* backgroundColor: "text.disabled" */ }}>
					<BottomAppBar />
				</Box>
			</Box>
		</Router >
	);
}
