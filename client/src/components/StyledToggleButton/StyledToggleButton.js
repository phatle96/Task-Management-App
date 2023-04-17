import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Container } from '@mui/material';


export default function StyledToggleButton() {
  const [view, setView] = React.useState('list');

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <Box>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleChange}
        size="small"
        aria-label="text alignment"
      >
        <ToggleButton value="list" aria-label="list">
          {/* <FilterListIcon/>  */}
          filter
        </ToggleButton>
        <ToggleButton value="module" aria-label="module">
          {/* <SortByAlphaIcon/>  */}
          sort
        </ToggleButton>
        <ToggleButton value="quilt" aria-label="quilt" >
          {/* <EditIcon/>  */}
          edit
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}