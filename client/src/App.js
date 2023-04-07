import { React } from "react";
import { Avatar, Box, Button, Grid, Stack, Typography, } from "@mui/material";
import Appbar from "./components/Appbar/Appbar"
import BottomAppBar from "./components/BottomAppbar/BottomAppbar";
import NavBar from "./components/NavBar/NavBar";
import { ListsProvider } from "./context/ListsContext";
import TabGroup from "./components/TabGroup/TabGroup";
import MyCalendar from "./components/Calendar/Calendar";
import AccordionAddTask from "./components/AccordionAddTask/AccordionAddTask";
import ListTitle from "./components/ListTitle/ListTitle";
import TabTool from "./components/TabTool/TabTool";
import TaskDetail from "./components/TaskDetail/TaskDetail";
import PersonDetail from "./components/PersonDetail/PersonDetail";

export default function App() {
	return (
		<ListsProvider>
			<Appbar />
			<Stack direction="row" >
				<NavBar />
				<Stack direction="column">
					<ListTitle />
					<Grid container spacing={2} paddingTop={3} paddingLeft={3}  >
						<Grid item xs={12} sm={12} md={4} lg={4}>
							<AccordionAddTask />
							<TaskDetail />
							<PersonDetail />
						</Grid>
						<Grid item xs={0} sm={0} md={8} lg={8}>
							<TabGroup />
						</Grid>
					</Grid>
				</Stack>
			</Stack>
			<BottomAppBar />
		</ListsProvider>

	);
}
