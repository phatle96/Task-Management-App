import { React } from "react";
import { Box, Stack, } from "@mui/material";
import Appbar from "./components/Appbar/Appbar"
import BottomAppBar from "./components/BottomAppbar/BottomAppbar";
import NavBar from "./components/NavBar/NavBar";
import TabGroup from "./components/TabGroup/TabGroup";
import AccordionAddTask from "./components/AccordionAddTask/AccordionAddTask";
import TaskDetail from "./components/TaskDetail/TaskDetail";
import PersonDetail from "./components/PersonDetail/PersonDetail";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ListTitle from "./components/ListTitle/ListTitle";

export default function App() {
	return (
		<Box sx={{ width: '100%' }}>
			<Stack direction="column" justifyContent="space-between">
				<Box sx={{ backgroundColor: "info.main" }}>
					<Appbar />
				</Box>
				<Stack direction="row" >
					<Box sx={{ backgroundColor: "secondary.main" }} >
						<NavBar />
					</Box>
					<Box sx={{ width: '100%' }}>
						<Stack direction="column">
							<Box sx={{ backgroundColor: "info.main" }}>
								<ListTitle/>
							</Box>
							<Grid2 container >
								<Grid2 xs={0} sm={0} md={5} lg={4}
									sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" }, backgroundColor: "warning.main" }}>
									<AccordionAddTask />
									<TaskDetail />
									<PersonDetail />
								</Grid2>
								<Grid2 xs={0} sm={0} md={7} lg={8}
									sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" }, backgroundColor: "error.main" }}>
									<TabGroup />
								</Grid2>
								<Grid2 xs={12} sm={12} md={0} lg={0}
									sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" }, backgroundColor: "primary.main" }}>
									<TabGroup />
								</Grid2>
							</Grid2>
						</Stack>
					</Box>
				</Stack>
				<Box sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" }, backgroundColor: "text.disabled" }}>
					<BottomAppBar />
				</Box>
			</Stack>
		</Box>
	);
}
