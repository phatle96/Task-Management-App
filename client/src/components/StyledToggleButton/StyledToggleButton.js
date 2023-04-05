import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import EditIcon from '@mui/icons-material/Edit';

export default function StyledToggleButton() {
  const [view, setView] = React.useState('list');

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
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
  );
}