import { React } from "react";
import { Avatar, Box, Button, Container, Grid, Stack, Typography, } from "@mui/material";
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
			<Stack sx={{display:"flex"}} position="relative" direction="row" >
				<NavBar />
				<Stack sx={{display:"flex"}} direction="column" alignContent="stretch" position="relative">
					<ListTitle />
					<Grid container paddingTop={3} paddingLeft={3} display="flex" alignItems="stretch" alignContent="stretch"  sx={{display:"flex"}} >
						<Grid item xs={12} sm={12} md={4} lg={5}
							display="flex" alignContent="stretch" position="relative">
							<Box display="flex" position="relative" flexDirection="column" alignContent="stretch" sx={{ flexGrow:1, width: 1 }}>
								<AccordionAddTask />
								<TaskDetail />
								<PersonDetail />
							</Box>
						</Grid>
						<Grid item xs={0} sm={0} md={8} lg={7}
							display="flex" position="relative" alignContent="stretch"
							sx={{ flexWrap: 'wrap' }}>
							<TabGroup />
						</Grid>
					</Grid>
				</Stack>
			</Stack>
			<BottomAppBar />
		</ListsProvider>

	);
}
