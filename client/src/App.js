import { React } from "react";
import { Grid, Stack, } from "@mui/material";
import Appbar from "./components/Appbar/Appbar"
import BottomAppBar from "./components/BottomAppbar/BottomAppbar";
import Calendar from "./components/Calendar/Calendar"
import NavBar from "./components/NavBar/NavBar";
import { ListsProvider } from "./context/ListsContext";
import TabGroup from "./components/TabGroup/TabGroup";


export default function App() {


	return (
		<ListsProvider>
			<Appbar />
			<Stack direction="row" >
				<NavBar />
				<Grid container spacing={2} paddingTop={3} paddingLeft={3}  >
					<Grid item xs={12} sm={12} md={4} lg={4}>
						<TabGroup />
					</Grid>
					<Grid item xs={0} sm={0} md={8} lg={8}>
						<Calendar />
					</Grid>
				</Grid>
			</Stack>
			<BottomAppBar />
		</ListsProvider>

	);
}
