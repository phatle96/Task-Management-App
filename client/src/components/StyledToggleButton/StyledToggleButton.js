import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Container, Divider } from '@mui/material';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import TableChartIcon from '@mui/icons-material/TableChart';
import Typography from '@mui/material/node/Typography';

export default function StyledToggleButton() {
	const [view, setView] = React.useState("card");
	const [control, setControl] = React.useState(null);

	const handleview = (event, nextView) => {
		if (nextView !== null) {
			setView(nextView);
		}
	};
	const handleControl = (event, nextControl) => {
		setControl(nextControl);
	};



	return (
		<Box sx={{ display: "flex" }}>
			<ToggleButtonGroup
				value={view}
				exclusive
				onChange={handleview}
				size="small"
				aria-label="text alignment"
				sx={{ paddingRight: 1 }}>
				<ToggleButton value="card" aria-label="card">
					Card
				</ToggleButton>
				<ToggleButton value="table" aria-label="table">
					Table
				</ToggleButton>
			</ToggleButtonGroup>
			{
				view === "card" &&
				<>
					<Divider orientation="vertical" variant='middle' flexItem />
					<ToggleButtonGroup
						value={control}
						exclusive
						onChange={handleControl}
						size="small"
						aria-label="text alignment"
						sx={{ paddingLeft: 1 }}
					>
						<ToggleButton value="filter" aria-label="filter">
							{/* <FilterListIcon/>  */}
							filter
						</ToggleButton>
						<ToggleButton value="sort" aria-label="sort">
							{/* <SortByAlphaIcon/>  */}
							sort
						</ToggleButton>
						<ToggleButton value="edit" aria-label="edit" >
							{/* <EditIcon/>  */}
							edit
						</ToggleButton>
					</ToggleButtonGroup>
				</>
			}
		</Box>
	);
}